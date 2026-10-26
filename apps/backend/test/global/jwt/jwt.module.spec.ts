import { Injectable } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { AccessTokenStrategy } from '../../../src/global/jwt/access-token.strategy'
import { GlobalJwtModule } from '../../../src/global/jwt/jwt.module'
import { RefreshTokenStrategy } from '../../../src/global/jwt/refresh-token.strategy'
import { ACCESS_SECRET, authenticate, REFRESH_SECRET, signToken } from './jwt-test.util'

@Injectable()
class JwtConsumer {
  constructor(readonly jwtService: JwtService) {}
}

describe('GlobalJwtModule', () => {
  let moduleRef: TestingModule

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              JWT_ACCESS_SECRET: ACCESS_SECRET,
              JWT_REFRESH_SECRET: REFRESH_SECRET,
            }),
          ],
        }),
        GlobalJwtModule,
      ],
      providers: [JwtConsumer],
    }).compile()
  })

  afterEach(async () => {
    await moduleRef.close()
  })

  it('registers passport and jwt, and provides both token strategies', () => {
    const imports = Reflect.getMetadata('imports', GlobalJwtModule) as unknown[]
    const providers = Reflect.getMetadata('providers', GlobalJwtModule) as unknown[]
    const exportsMetadata = Reflect.getMetadata('exports', GlobalJwtModule) as unknown[]

    expect(imports).toEqual([PassportModule, JwtModule])
    expect(providers).toEqual([AccessTokenStrategy, RefreshTokenStrategy])
    expect(exportsMetadata).toEqual([JwtModule, PassportModule])

    const jwtContext = moduleRef.select(GlobalJwtModule)
    expect(jwtContext.get(AccessTokenStrategy)).toBeInstanceOf(AccessTokenStrategy)
    expect(jwtContext.get(RefreshTokenStrategy)).toBeInstanceOf(RefreshTokenStrategy)
  })

  it('exports JwtService to modules that import it', () => {
    expect(moduleRef.get(JwtConsumer).jwtService).toBeInstanceOf(JwtService)
  })

  it('verifies access and refresh tokens with the configured secrets', async () => {
    const jwtContext = moduleRef.select(GlobalJwtModule)
    const accessToken = signToken({ sub: 9 }, ACCESS_SECRET)
    const refreshToken = signToken({ sub: 9 }, REFRESH_SECRET)

    await expect(
      authenticate(jwtContext.get(AccessTokenStrategy), {
        authorization: `Bearer ${accessToken}`,
      }),
    ).resolves.toEqual({ id: 9 })

    await expect(
      authenticate(jwtContext.get(RefreshTokenStrategy), {
        'x-refresh-token': refreshToken,
      }),
    ).resolves.toEqual({ id: 9, refreshToken })
  })
})
