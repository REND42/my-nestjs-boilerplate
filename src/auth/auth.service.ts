import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import PGErrorCode from 'src/config/pgErrorCode.enum';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import TokenPayload from './interface/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  
  
  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10)
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword
      })
      // createdUser.password = undefined
      console.log(2233, createdUser)
      return createdUser
    } catch (error) {
      if(error?.code === PGErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exist', HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId }
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`
  }

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email)
      await this.verifyPassword(password, user.password)
      user.password = undefined
      return user
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isMatching = await bcrypt.compare(
      password, hashedPassword
    )
    if(!isMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
    }
  }

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOne(email)
  //   if(user && user.password === password) {
  //     const { password, ...result } = user
  //     return result
  //   }
  //   return null
  // }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId }
  //   return {
  //     access_token: this.jwtService.sign(payload)
  //   }
  // }
}