import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Buffer } from 'node:buffer'
import ts from 'typescript'

const testDirectory = path.dirname(fileURLToPath(import.meta.url))

// Load the actual TypeScript clients with a fake browser environment, without a test dependency.
function loadClient() {
  const cache = new Map()
  function load(name) {
    const file = path.resolve(testDirectory, '../src/account', name + '.ts')
    if (cache.has(file)) return cache.get(file).exports
    const record = { exports: {} }
    cache.set(file, record)
    const source = fs
      .readFileSync(file, 'utf8')
      .replaceAll('import.meta.env.VITE_API_URL', "'http://localhost:3000'")
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
    }).outputText
    const localRequire = (target) => {
      assert.ok(target.startsWith('./'))
      return load(target.slice(2))
    }
    new Function('require', 'module', 'exports', compiled)(localRequire, record, record.exports)
    return record.exports
  }
  return {
    client: load('auth-session'),
    session: load('auth-session'),
    navigation: load('auth-session'),
  }
}
function access(seconds, signature = 'signature') {
  return (
    'header.' +
    Buffer.from(JSON.stringify({ sub: 7, exp: Math.floor(Date.now() / 1000) + seconds })).toString(
      'base64url',
    ) +
    '.' +
    signature
  )
}
function tokens(seconds = 3600, suffix = 'original') {
  return { accessToken: access(seconds, suffix), refreshToken: suffix + '-refresh' }
}
function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
function deferred() {
  let resolve
  const promise = new Promise((done) => {
    resolve = done
  })
  return { promise, resolve }
}

const previousWindow = globalThis.window
const previousFetch = globalThis.fetch
beforeEach(() => {
  const values = new Map()
  const target = new EventTarget()
  target.sessionStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
  globalThis.window = target
  globalThis.fetch = async () => {
    throw new Error('Unexpected network request')
  }
})
afterEach(() => {
  globalThis.window = previousWindow
  globalThis.fetch = previousFetch
})

test('restores a stored session after module reload and authenticates the user lookup', async () => {
  const first = loadClient()
  const saved = tokens()
  first.session.saveAuthSession(saved)
  const next = loadClient()
  const user = { id: 7, username: 'lfc_user', email: 'user@example.com' }
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'http://localhost:3000/auth/me')
    assert.equal(new Headers(options.headers).get('authorization'), 'Bearer ' + saved.accessToken)
    return json(user)
  }
  assert.deepEqual(next.session.getAuthSession(), saved)
  assert.deepEqual(await next.client.getCurrentAuthUser(), user)
})

test('shares a single refresh across concurrent expired-token requests', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens(-60))
  const next = tokens(3600, 'rotated')
  let refreshCount = 0
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/refresh')) {
      refreshCount++
      await Promise.resolve()
      assert.equal(options.headers['x-refresh-token'], 'original-refresh')
      return json(next)
    }
    assert.equal(new Headers(options.headers).get('authorization'), 'Bearer ' + next.accessToken)
    return json({ ok: true })
  }
  assert.deepEqual(
    await Promise.all([
      client.authenticatedRequest('/one'),
      client.authenticatedRequest('/two'),
      client.authenticatedRequest('/three'),
    ]),
    [{ ok: true }, { ok: true }, { ok: true }],
  )
  assert.equal(refreshCount, 1)
  assert.deepEqual(session.getAuthSession(), next)
})

test('refreshes once and retries a protected request once after HTTP 401', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens())
  let attempts = 0
  let refreshCount = 0
  const next = tokens(3600, 'next')
  globalThis.fetch = async (url) => {
    if (url.endsWith('/auth/refresh')) {
      refreshCount++
      return json(next)
    }
    attempts++
    return attempts === 1 ? json({ message: 'expired' }, 401) : json({ ok: true })
  }
  assert.deepEqual(await client.authenticatedRequest('/protected'), { ok: true })
  assert.equal(attempts, 2)
  assert.equal(refreshCount, 1)
})

test('clears a rejected session without retrying forever', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens())
  let refreshCount = 0
  let attempts = 0
  globalThis.fetch = async (url) => {
    if (url.endsWith('/auth/refresh')) {
      refreshCount++
      return json(tokens(3600, 'next'))
    }
    attempts++
    return json({ message: 'invalid' }, 401)
  }
  await assert.rejects(client.authenticatedRequest('/protected'), { status: 401 })
  assert.equal(refreshCount, 1)
  assert.equal(attempts, 2)
  assert.equal(session.getAuthSession(), null)
})

test('clears storage if the refresh token is rejected', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens(-60))
  globalThis.fetch = async (url) => {
    assert.ok(url.endsWith('/auth/refresh'))
    return json({ code: 'AUTH_INVALID_REFRESH_TOKEN', message: 'invalid refresh' }, 401)
  }
  await assert.rejects(client.getCurrentAuthUser(), {
    status: 401,
    code: 'AUTH_INVALID_REFRESH_TOKEN',
  })
  assert.equal(session.getAuthSession(), null)
})

test('keeps the session when refresh fails with a temporary server error', async () => {
  const { client, session } = loadClient()
  const saved = tokens(-60)
  session.saveAuthSession(saved)
  globalThis.fetch = async () => json({ message: 'unavailable' }, 503)
  await assert.rejects(client.getCurrentAuthUser(), { status: 503 })
  assert.deepEqual(session.getAuthSession(), saved)
})

test('keeps the session on a connection failure', async () => {
  const { client, session } = loadClient()
  const saved = tokens()
  session.saveAuthSession(saved)
  globalThis.fetch = async () => {
    throw new TypeError('offline')
  }
  await assert.rejects(client.getCurrentAuthUser(), { status: 0 })
  assert.deepEqual(session.getAuthSession(), saved)
})

test('does not refresh or log out on HTTP 403', async () => {
  const { client, session } = loadClient()
  const saved = tokens()
  session.saveAuthSession(saved)
  let calls = 0
  globalThis.fetch = async (url) => {
    calls++
    assert.ok(url.endsWith('/protected'))
    return json({ message: 'forbidden' }, 403)
  }
  await assert.rejects(client.authenticatedRequest('/protected'), { status: 403 })
  assert.equal(calls, 1)
  assert.deepEqual(session.getAuthSession(), saved)
})

test('shares logout, handles an empty 204 response, and supports another login/logout later', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens())
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.ok(url.endsWith('/auth/logout'))
    assert.equal(options.method, 'POST')
    return new Response(null, { status: 204 })
  }
  await Promise.all([client.logoutSession(), client.logoutSession()])
  assert.equal(calls, 1)
  assert.equal(session.getAuthSession(), null)
  await client.logoutSession()
  session.saveAuthSession(tokens(3600, 'new-login'))
  await client.logoutSession()
  assert.equal(calls, 2)
  assert.equal(session.getAuthSession(), null)
})

test('refreshes an expired access token before revoking the server session', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens(-60))
  const next = tokens(3600, 'next')
  const sequence = []
  globalThis.fetch = async (url, options) => {
    sequence.push(new URL(url).pathname)
    if (url.endsWith('/auth/refresh')) return json(next)
    assert.equal(options.headers.Authorization, 'Bearer ' + next.accessToken)
    return new Response(null, { status: 204 })
  }
  await client.logoutSession()
  assert.deepEqual(sequence, ['/auth/refresh', '/auth/logout'])
  assert.equal(session.getAuthSession(), null)
})

test('does not resurrect a session when a delayed refresh arrives after logout', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens(-60))
  const pending = deferred()
  globalThis.fetch = () => pending.promise
  const request = client.refreshAuthSession()
  session.clearAuthSession()
  pending.resolve(json(tokens(3600, 'late')))
  await assert.rejects(request, { status: 401 })
  assert.equal(session.getAuthSession(), null)
})

test('does not overwrite a newer login with an earlier refresh response', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens(-60))
  const pending = deferred()
  globalThis.fetch = () => pending.promise
  const request = client.refreshAuthSession()
  const newer = tokens(3600, 'new-user')
  session.saveAuthSession(newer)
  pending.resolve(json(tokens(3600, 'stale')))
  await assert.rejects(request, { status: 401 })
  assert.deepEqual(session.getAuthSession(), newer)
})

test('does not retry a stale request using a newly logged-in account', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens())
  const pending = deferred()
  const started = deferred()
  let calls = 0
  globalThis.fetch = () => {
    calls++
    started.resolve()
    return pending.promise
  }
  const request = client.authenticatedRequest('/protected')
  await started.promise
  const newer = tokens(3600, 'new-user')
  session.saveAuthSession(newer)
  pending.resolve(json({ message: 'old token rejected' }, 401))
  await assert.rejects(request, { status: 401 })
  assert.equal(calls, 1)
  assert.deepEqual(session.getAuthSession(), newer)
})

test('does not send bearer tokens to an external URL', async () => {
  const { client, session } = loadClient()
  session.saveAuthSession(tokens())
  let calls = 0
  globalThis.fetch = async () => {
    calls++
    return json({})
  }
  await assert.rejects(client.authenticatedRequest('https://other.example/private'))
  assert.equal(calls, 0)
})

test('treats malformed stored data as an anonymous session', () => {
  const { session } = loadClient()
  window.sessionStorage.setItem('lfc.auth.v1', '{not-json')
  assert.equal(session.getAuthSession(), null)
  assert.equal(session.getAuthSessionSnapshot(), null)
})

test('accepts only internal non-auth return destinations', () => {
  const { navigation } = loadClient()
  assert.equal(
    navigation.loginDestination({ from: '/bet?side=pro#amount' }),
    '/bet?side=pro#amount',
  )
  for (const from of [
    'https://other.example',
    '//other.example',
    '/login',
    '/signup?x=1',
    '/logout',
    '/\\other.example',
  ])
    assert.equal(navigation.loginDestination({ from }), '/day/1')
})
