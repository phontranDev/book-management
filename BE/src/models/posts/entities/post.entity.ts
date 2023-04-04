import { PostToUser } from '@models/post_comment/entities/post_comment.entity';
import { PostLike } from '@models/post_like/entities/post_like.entity';
import { Tag } from '@models/tags/entities/tag.entity';
import { User } from '@models/users/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  coverImg: string;

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true, default: false })
  isDeleted: boolean;

  @Column({ nullable: true, default: null, type: 'longtext' })
  content: null | string;

  @CreateDateColumn({ name: 'published_at' })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (author) => author.posts, {
    eager: true,
    cascade: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];

  @OneToMany(() => PostToUser, (comments) => comments.post, {
    cascade: ['insert', 'update'],
  })
  comments: PostToUser[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  public postLike!: PostLike[];
}
