import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from '../../../global/security/access-token.guard'
import { CurrentMember } from '../../../global/security/current-member.decorator'
import { RefreshTokenGuard } from '../../../global/security/refresh-token.guard'
import { AuthService } from '../application/auth.service'
import { TokenResponseDto } from '../application/dtos/token-response.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // todo: POST /auth/register 회원가입
  // todo: POST /auth/login 로그인 및 토큰 발급

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Access Token 재발급' })
  refresh(
    @CurrentMember() member: { id: number; refreshToken: string },
  ): Promise<TokenResponseDto> {
    return this.authService.refresh(member.id, member.refreshToken)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'accessToken 폐기(로그아웃)' })
  logout(@CurrentMember() member: { id: number }): Promise<void> {
    return this.authService.logout(member.id)
  }
}
