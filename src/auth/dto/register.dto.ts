import { ApiProperty } from "@nestjs/swagger"

export default class RegisterDto {
  @ApiProperty({
    description: '邮箱地址',
    type: String,
    required: true
  })
  email: string

  @ApiProperty({
    description: '用户名',
    type: String,
    required: true
  })
  username: string

  @ApiProperty({
    description: '密码',
    type: String,
    required: true
  })
  password: string

}