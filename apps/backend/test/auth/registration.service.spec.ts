import { BadRequestException } from '@nestjs/common'
import { AuthException } from '../../src/domain/auth/exception/auth.exception'
import * as bcrypt from 'bcrypt'
import { QueryFailedError } from 'typeorm'
import { RegistrationService } from '../../src/domain/auth/application/registration.service'
import { EmailVerificationService } from '../../src/domain/auth/application/email-verification.service'
import { RegisterDto } from '../../src/domain/auth/application/dtos/register.dto'

describe('RegistrationService', () => {
  const dto: RegisterDto = {
    username: 'lfc_user',
    email: 'user@gmail.com',
    password: 'secret1234',
    verificationToken: 'a'.repeat(64),
  }
  function setup() {
    const members = {
      findById: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn().mockResolvedValue(null),
      findByUsername: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockImplementation(async (member) => ({ ...member, id: 1 })),
    }
    const verification = { limit: jest.fn(), consume: jest.fn().mockResolvedValue(undefined) }
    const service = new RegistrationService(
      members,
      verification as unknown as EmailVerificationService,
    )
    return { members, verification, service }
  }

  it('hashes the password and returns only public member fields', async () => {
    const { service, members, verification } = setup()
    await expect(service.register(dto, '127.0.0.1')).resolves.toEqual({
      id: 1,
      username: dto.username,
      email: dto.email,
    })
    const saved = members.save.mock.calls[0][0]
    expect(saved.password).not.toBe(dto.password)
    await expect(bcrypt.compare(dto.password, saved.password)).resolves.toBe(true)
    expect(verification.consume).toHaveBeenCalledWith(dto.email, dto.verificationToken)
  })

  it.each(['findByEmail', 'findByUsername'] as const)(
    'rejects duplicate %s before consuming proof',
    async (method) => {
      const { service, members, verification } = setup()
      members[method].mockResolvedValue({ id: 2 })
      await expect(service.register(dto, 'ip')).rejects.toBeInstanceOf(AuthException)
      expect(verification.consume).not.toHaveBeenCalled()
      expect(members.save).not.toHaveBeenCalled()
    },
  )

  it('does not save a member when proof is missing, mismatched, expired or reused', async () => {
    const { service, members, verification } = setup()
    verification.consume.mockRejectedValue(new BadRequestException())
    await expect(service.register(dto, 'ip')).rejects.toBeInstanceOf(BadRequestException)
    expect(members.save).not.toHaveBeenCalled()
  })

  it('rejects a multibyte password exceeding the bcrypt byte limit', async () => {
    const { service, members } = setup()
    await expect(
      service.register({ ...dto, password: '가'.repeat(25) }, 'ip'),
    ).rejects.toMatchObject({ code: 'AUTH_PASSWORD_TOO_LONG', status: 400 })
    expect(members.save).not.toHaveBeenCalled()
  })

  it('maps concurrent unique constraint violations to 409', async () => {
    const { service, members } = setup()
    members.save.mockRejectedValue(
      new QueryFailedError('INSERT', [], Object.assign(new Error(), { code: 'ER_DUP_ENTRY' })),
    )
    await expect(service.register(dto, 'ip')).rejects.toBeInstanceOf(AuthException)
  })
})
