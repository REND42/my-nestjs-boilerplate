import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Request, Res, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import RequestWithUser from './interface/requestWithUser.interface';

@ApiTags('权限')
@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  strategy: 'excludeAll'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('register')
  @ApiOperation({description: '注册'})
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData)
  }

  // @UseGuards(AuthGuard('local'))

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({description: '登录'})
  @ApiBody({ type: LoginDto})
  @ApiOkResponse({
    description: 'result token'
  })
  async login(@Req() request: RequestWithUser) {
    const { user } = request
    const cookie = this.authService.getCookieWithJwtToken(user.id)
    request.res.setHeader('Set-Cookie', cookie)
    return user
  }
  // login(@Request() req: RequestWithUser, @Res() res: Response) {
  //   const user = req.user
  //   const cookie = this.authService.getCookieWithJwtToken(user.id)
  //   res.setHeader('Set-Cookie', cookie)
  //   return res.send(user)
  // }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({description: '登出'})
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogout())
    return res.sendStatus(200)
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({description: '获取当前用户信息'})
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user
    user.password = undefined
    return user
  }

  // @UseGuards(AuthGuard('jwt'))
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user
//   }
}
