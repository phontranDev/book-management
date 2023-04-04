import { NotFoundException } from '@nestjs/common';
import { BaseAbstractRepository } from '@models/base/base.abstract.repository';
import { Tag } from '@models/tags/entities/tag.entity';
import { User } from '@models/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { Post } from './entities/post.entity';
import { PostCommentService } from '@models/post_comment/post_comment.service';

@Injectable()
export class PostsRepository extends BaseAbstractRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
    private readonly postCommentService: PostCommentService,
  ) {
    super(repository);
  }

  async createPost(
    createPostDto: CreatePostDto,
    tags: Tag[] = [],
    author: User = null,
  ) {
    const { title, slug, content, published, coverImg } = createPostDto;

    const post = new Post();
    post.title = title;
    post.slug = slug;
    post.content = content;
    post.tags = tags;
    post.author = author;
    post.published = published;
    post.coverImg = coverImg;

    return await this.repository.save(post);
  }

  async findOneBySlug(slug: string) {
    const relations = ['tags', 'author'];
    const post = await this.repository.findOne({
      where: {
        slug,
      },
      relations,
    });
    const comments = await this.postCommentService.loadComments(post.id);

    if (!post) throw new NotFoundException(`Post with slug ${slug} not found`);
    const data = {
      ...post,
      comments,
    };
    return data;
  }
}
