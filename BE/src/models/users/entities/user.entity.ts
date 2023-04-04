import LocalFile from '@models/local-files/entities/localFiles.entity';
import { Post } from '@models/posts/entities/post.entity';
import { PostToUser } from '@models/post_comment/entities/post_comment.entity';
import { PostLike } from '@models/post_like/entities/post_like.entity';
import { Subscription } from '@models/subscriptions/entities/subscription.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Follows } from './follow.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  name: null | string;

  @Column({ nullable: true, default: null })
  phoneNumber: null | string;

  @Column({ nullable: true, default: null })
  address: null | string;

  @Column({ nullable: true, default: false })
  isBanned: boolean | null;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  @Column()
  public stripeCustomerId: string;

  @OneToOne(() => LocalFile, {
    nullable: true,
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  public avatar?: LocalFile;

  @Column({ default: false })
  public isSubscrite: boolean;

  @OneToMany(() => Subscription, (subscription) => subscription.user, {
    cascade: ['insert', 'update'],
  })
  subscriptions?: Subscription[];

  @OneToMany(() => PostToUser, (postcomment) => postcomment.user, {
    cascade: ['insert', 'update'],
  })
  postcomments?: PostToUser[];

  @OneToMany(() => Post, (post) => post.author, {
    cascade: ['insert', 'update'],
  })
  posts?: Post[];

  @OneToMany(() => Follows, (follows) => follows.following)
  followers: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  followings: Follows[];

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  public postLike!: PostLike[];
}
