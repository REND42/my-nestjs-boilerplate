import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import Category from "../../categories/categories.entity"

class CategoriesDto {
  @ApiProperty({
    description: '分类id',
    type: Number,
    required: true
  })
  id: number
}

export default class CreatePostDto {
  @ApiProperty({
    description: '标题',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: '内容',
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({
    description: '分类',
    // type: () => CategoriesDto,
    type: [CategoriesDto],
    required: false
  })
  categories: CategoriesDto[]
}