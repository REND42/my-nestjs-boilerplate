import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Request, Res, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import JwtAuthGuard from './guards/jwt-auth.guard';
import LocalAuthGuard from './guards/local-auth.guard';
import RequestWithUser from './interface/requestWithUser.interface';

@ApiTags('权限')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService  
  ) {}

  @Post('register')
  @ApiOperation({description: '注册'})
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({description: '登录'})
  @ApiBody({ type: LoginDto})
  @ApiOkResponse({
    description: 'access_token'
  })
  async login(@Req() req: RequestWithUser) {
    const { user } = req
    return this.authService.login(user)
  }


  // @ApiCookieAuth()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({description: '获取当前用户信息'})
  authenticate(@Req() req: RequestWithUser) {
    let id = req.user.id
    return this.usersService.findById(id)
  }
}
