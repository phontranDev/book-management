import { PageOptionsDto } from '@common/dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('demo')
  async demo() {
    return await this.postsService.demo();
  }

  @Get()
  async getAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.postsService.searchForPosts(pageOptionsDto);
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return await this.postsService.findPostBySlug(slug);
  }

  @Post('save')
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number) {
    return await this.postsService.deletePost(id);
  }
}
