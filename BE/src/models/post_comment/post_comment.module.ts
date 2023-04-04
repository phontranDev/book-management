import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostToUser } from './entities/post_comment.entity';
import { PostCommentService } from './post_comment.service';
import { PostCommentController } from './post_comment.controller';
import { PostsModule } from '@models/posts/posts.module';
import { UsersModule } from '@models/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostToUser]),
    forwardRef(() => PostsModule),
    UsersModule,
  ],
  providers: [PostCommentService],
  controllers: [PostCommentController],
  exports: [PostCommentService],
})
export class PostCommentModule {}
