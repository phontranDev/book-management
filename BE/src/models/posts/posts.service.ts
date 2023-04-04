import { PageDto, PageMetaDto, PageOptionsDto } from '@common/dtos';
import { BaseService } from '@models/base/base.service';
import { PostToUser } from '@models/post_comment/entities/post_comment.entity';
import { Tag } from '@models/tags/entities/tag.entity';
import { TagsService } from '@models/tags/tags.service';
import { UsersService } from '@models/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Like, Repository } from 'typeorm';

import { CreatePostDto } from './dto/createPost.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.reposiory';

@Injectable()
export class PostsService extends BaseService<Post, Repository<Post>> {
  constructor(
    @InjectRepository(Post)
    private readonly baseRepo: Repository<Post>,
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,

    private readonly postsRepository: PostsRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(baseRepo);
  }

  async searchForPosts(pageOptionsDto: PageOptionsDto) {
    const [items, itemCount] = await this.baseRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('author.avatar', 'avatar')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.children', 'parent')
      .loadRelationCountAndMap('post.likeCount', 'post.postLike')
      .loadRelationCountAndMap('comment.commentCount', 'post.comments')
      .where('comment.parent IS NULL')
      .andWhere('post.title like :search', {
        search: `%${pageOptionsDto.search || ''}%`,
      })
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .orderBy('post.id', pageOptionsDto.order)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(items, pageMetaDto);
  }

  async findPostBySlug(slug: string) {
    const result = await this.baseRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('author.avatar', 'avatar')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'commentParent')
      .leftJoinAndSelect('commentParent.avatar', 'commentParentAvatar')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('children.user', 'commentChildren')
      .leftJoinAndSelect('commentChildren.avatar', 'commentChildrenAvatar')
      .loadRelationCountAndMap('post.likeCount', 'post.postLike')
      .loadRelationCountAndMap('comment.commentCount', 'post.comments')
      .where('comment.parent IS NULL')
      .andWhere('post.slug = :slug', { slug })
      .getOne();

    return result;
  }

  async finAllPostWithTag() {
    const posts = await this.postsRepository.findAll();
    return posts;
  }

  async createPost(createPostDto: CreatePostDto) {
    const tags: Tag[] = await this.tagsService.findTagByTitles(
      createPostDto.tags,
    );

    const user = await this.usersService.findOneById(createPostDto.author);

    return await this.postsRepository.createPost(createPostDto, tags, user);
  }

  public async deletePost(id: number) {
    const post = await this.baseRepo.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return await this.baseRepo.save({
      ...post,
      isDeleted: true,
    });
  }

  async getPostById(id: number) {
    const post = await this.baseRepo.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async demo() {
    const data = await this.baseRepo.find({
      relations: ['user'],
      where: {
        author: {
          followers: {
            following: {
              id: 7,
            },
          },
        },
      },
    });

    return data;
  }
}
