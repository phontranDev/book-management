import { PageOptionsDto } from '@common/dtos';
import { CreateBookDto } from '@models/books/dto/createBook.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.booksService.searchForBooks(pageOptionsDto);
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return await this.booksService.findOneBySlug(slug);
  }

  @Post('save')
  async create(@Body() data: CreateBookDto) {
    return await this.booksService.create(data);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number) {
    return await this.booksService.deleteBook(id);
  }

  @Get(':slug/find-with-slug-category')
  async getBookBySlugCategory(
    @Param('slug') slug: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.booksService.findBySlugCategory(slug, pageOptionsDto);
  }
}
