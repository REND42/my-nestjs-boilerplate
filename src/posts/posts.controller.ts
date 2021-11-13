import { Body, Controller, Delete, Get, Param, Post, Put, SerializeOptions, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import FindOneParams from 'src/utils/findOneParams';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { PostsService } from './posts.service';

@ApiTags("文章")
@Controller('posts')
@SerializeOptions({
  strategy: 'exposeAll'
})
export class PostsController {

  constructor(
    private readonly postsService: PostsService
  ) {}

  @Get()
  @ApiOperation({description: '获取全部文章'})
  getAllPosts() {
    return this.postsService.getAllPosts()
  }

  @Get(':id')
  @ApiParam({
    description: '文章id',
    name: 'id',
  })
  @ApiOperation({description: '通过id获取文章'})
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id))
  }

  @Post()
  @ApiOperation({description: '新建文章'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post)
  }

  @Put(':id')
  @ApiOperation({description: '更新文章'})
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post)
  }

  @Delete(':id')
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id))
  }
}
