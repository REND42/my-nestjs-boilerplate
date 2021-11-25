import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import TokenPayload from "../interface/tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
      //   return request?.cookies?.Authentication;
      // }]),
      // secretOrKey: configService.get('JWT_SECRET')
      secretOrKey: 'TryNest'
    })
  }

  async validate(payload: TokenPayload) {
    console.log('validate', payload)
    return this.userService.findById(payload.id)
  }
}