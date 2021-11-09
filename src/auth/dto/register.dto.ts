import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export default class RegisterDto {
  @ApiProperty({
    description: '邮箱地址',
    type: String,
    required: true
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: '用户名',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: '密码',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string

}