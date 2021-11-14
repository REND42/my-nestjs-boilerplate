import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import JwtAuthGuard from "../auth/guards/jwt-auth.guard";
import FindOneParams from "../utils/findOneParams";
import CategoriesService from "./categories.service";
import CreateCategoryDto from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";

@ApiTags("分类")
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Get()
  @ApiOperation({description: '获取所有分类'})
  getAllCategories() {
    return this.categoriesService.getAllCategories()
  }

  @Get(':id')
  @ApiParam({
    description: '分类id',
    name: 'id',
  })
  @ApiOperation({description: '通过id获取分类'})
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id))
  }

  @Post()
  @ApiOperation({description: '新建分类'})
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category)
  }

  @Patch(':id')
  @ApiOperation({description: '更新分类'})
  @ApiParam({
    description: '分类id',
    name: 'id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async updateCategory(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(Number(id), category)
  }

  @Delete(':id')
  @ApiOperation({description: '删除分类'})
  @ApiParam({
    description: '分类id',
    name: 'id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(Number(id))
  }
}