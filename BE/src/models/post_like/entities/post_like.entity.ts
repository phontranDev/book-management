import { Post } from '@models/posts/entities/post.entity';
import { User } from '@models/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'post_like' })
@Index(['postId', 'userId'], { unique: true })
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public postId: number;

  @Column()
  public userId: number;

  @ManyToOne(() => Post, (post) => post.postLike)
  public post: Post;

  @ManyToOne(() => User, (user) => user.postLike)
  public user: User;
}
