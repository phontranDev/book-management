import { Post } from '@models/posts/entities/post.entity';
import { User } from '@models/users/entities/user.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity()
export class PostToUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  public postId: number;

  @Column()
  public userId: number;

  @ManyToOne(() => User, (user) => user.postcomments, {
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
  })
  post: Post;

  @ManyToOne((type) => PostToUser, (comment) => comment.children)
  parent: PostToUser;

  @OneToMany((type) => PostToUser, (comment) => comment.parent)
  children: PostToUser[];

  @CreateDateColumn({ name: 'published_at' })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
