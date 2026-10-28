import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { AccessTokenStrategy } from '../../../src/global/jwt/access-token.strategy'
import { GlobalJwtModule } from '../../../src/global/jwt/jwt.module'
import { JwtTokenService } from '../../../src/global/jwt/jwt-token.service'
import { RefreshTokenStrategy } from '../../../src/global/jwt/refresh-token.strategy'
import { ACCESS_SECRET, authenticate, REFRESH_SECRET } from './jwt-test.util'

describe('JwtTokenService', () => {
  it('issues access and refresh tokens that the strategies accept', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              JWT_ACCESS_SECRET: ACCESS_SECRET,
              JWT_REFRESH_SECRET: REFRESH_SECRET,
              JWT_ACCESS_EXPIRES_IN: '15m',
              JWT_REFRESH_EXPIRES_IN: '7d',
            }),
          ],
        }),
        GlobalJwtModule,
      ],
    }).compile()

    const tokens = moduleRef.get(JwtTokenService).issue(42)
    const jwtContext = moduleRef.select(GlobalJwtModule)

    await expect(
      authenticate(jwtContext.get(AccessTokenStrategy), {
        authorization: `Bearer ${tokens.accessToken}`,
      }),
    ).resolves.toEqual({ id: 42 })

    await expect(
      authenticate(jwtContext.get(RefreshTokenStrategy), {
        'x-refresh-token': tokens.refreshToken,
      }),
    ).resolves.toEqual({ id: 42, refreshToken: tokens.refreshToken })

    expect(moduleRef.get(JwtTokenService).refreshTtlSeconds()).toBe(7 * 24 * 60 * 60)
    await moduleRef.close()
  })
})
