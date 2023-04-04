import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, EditCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    return await this.categoriesService.getAll();
  }

  @Get(':slug/find-by-slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.categoriesService.findBySlug(slug);
  }

  @Get(':id')
  async getByid(@Param('id') id: number) {
    return await this.categoriesService.findOneById(+id);
  }

  @Post('save')
  async create(@Body() data: CreateCategoryDto) {
    return await this.categoriesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: EditCategoryDto) {
    return await this.categoriesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoriesService.remove(id);
  }
}
