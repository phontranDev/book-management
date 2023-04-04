import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'follow_user' })
export class Follows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.followings)
  following: User;
}
