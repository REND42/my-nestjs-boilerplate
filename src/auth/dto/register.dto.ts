import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import Address from "../../users/address.entity"

class AddressDto {
  @ApiProperty({
    description: '街道',
    type: String,
    required: false
  })
  street: string

  @ApiProperty({
    description: '城市',
    type: String,
    required: false
  })
  city: string

  @ApiProperty({
    description: '国家',
    type: String,
    required: false
  })
  country: string
}

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

  @ApiProperty({
    description: '地址',
    type: () => AddressDto,
    required: false
  })
  address: Address

}