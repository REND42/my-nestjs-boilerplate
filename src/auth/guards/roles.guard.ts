import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if (!roles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest()
    let token = request.headers['authorization']

    const user = this.jwtService.decode(token)

    if(!user) {
      return false
    }
    return true

  }
}