import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateCategoryDto {
  @ApiProperty({
    description: '名称',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string
}