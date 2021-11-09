import { ApiProperty } from "@nestjs/swagger"

export default class CreatePostDto {
  @ApiProperty({
    description: '标题',
    type: String,
    required: true
  })
  title: string

  @ApiProperty({
    description: '内容',
    type: String,
    required: true
  })
  content: string
}