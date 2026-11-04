import { LoginDto } from '../application/dtos/login.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  UseGuards,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthExceptionFilter } from '../exception/auth-exception.filter'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from '../../../global/security/access-token.guard'
import { CurrentMember } from '../../../global/security/current-member.decorator'
import { RefreshTokenGuard } from '../../../global/security/refresh-token.guard'
import { AuthService } from '../application/auth.service'
import { TokenResponseDto } from '../application/dtos/token-response.dto'

@ApiTags('auth')
@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: '아이디·비밀번호 로그인 및 토큰 발급' })
  login(@Body() dto: LoginDto, @Ip() ip: string): Promise<TokenResponseDto> {
    return this.authService.login(dto, ip)
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: '현재 로그인한 회원 정보 조회' })
  me(@CurrentMember() member: { id: number }) {
    return this.authService.currentUser(member.id)
  }

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
  @ApiOperation({ summary: 'Refresh Token 폐기(로그아웃)' })
  logout(@CurrentMember() member: { id: number }): Promise<void> {
    return this.authService.logout(member.id)
  }
}
