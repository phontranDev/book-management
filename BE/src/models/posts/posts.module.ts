import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.reposiory';
import { TagsModule } from '@models/tags/tags.module';
import { CategoriesModule } from '@models/categories/categories.module';
import { UsersModule } from '@models/users/users.module';
import { PostCommentModule } from '@models/post_comment/post_comment.module';

@Module({
  imports: [
    CategoriesModule,
    UsersModule,
    TagsModule,
    PostCommentModule,
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [PostsRepository, PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
