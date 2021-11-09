import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export default class UpdatePostDto {
  @ApiProperty({
    description: 'id',
    type: Number,
    required: false
  })
  @IsNumber()
  @IsOptional()
  id: number

  @ApiProperty({
    description: '标题',
    type: String,
    required: false
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string


  @ApiProperty({
    description: '内容',
    type: String,
    required: false
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string
}