import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostCommentDto } from './dto/createPostComment.dto';
import { PostCommentService } from './post_comment.service';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly commentsService: PostCommentService) {}

  @Get(':id')
  async getAllCommentsByPostId(@Param('id') id: number) {
    console.log(typeof id);
    return await this.commentsService.loadComments(id);
  }

  @Post('save')
  async createComment(@Body() creatCommentDto: CreatePostCommentDto) {
    console.log(creatCommentDto);
    return await this.commentsService.createComment(creatCommentDto);
  }
}
