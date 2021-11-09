import { ApiProperty } from "@nestjs/swagger"

export default class UpdatePostDto {
  // @ApiProperty({
  //   description: 'id',
  //   type: Number,
  //   required: true
  // })
  // id: number

  @ApiProperty({
    description: '标题',
    type: String,
    required: false
  })
  title: string


  @ApiProperty({
    description: '内容',
    type: String,
    required: false
  })
  content: string
}