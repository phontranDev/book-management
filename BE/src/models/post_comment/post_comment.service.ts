import { PostsService } from '@models/posts/posts.service';
import { UsersService } from '@models/users/users.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostCommentDto } from './dto/createPostComment.dto';
import { PostToUser } from './entities/post_comment.entity';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostToUser)
    private readonly commentsRepository: Repository<PostToUser>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  async loadComments(id: number) {
    return null;
  }

  async getCommentById(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  async createComment(data: CreatePostCommentDto) {
    const user = await this.usersService.getUserById(data.userId);
    const post = await this.postsService.getPostById(data.postId);

    let parent = null;

    if (data.parentId) {
      parent = await this.getCommentById(data.parentId);
    }

    const createComment = await this.commentsRepository.save({
      ...data,
      user,
      post,
      parent,
    });

    return createComment;
  }
}
