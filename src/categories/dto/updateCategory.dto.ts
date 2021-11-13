import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class UpdateCategoryDto {
  @ApiProperty({
    description: 'id',
    type: Number,
    required: true
  })
  @IsNumber()
  @IsOptional()
  id: number

  @ApiProperty({
    description: '名称',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string
}