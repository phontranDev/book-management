import { Plan } from '@models/plans/entities/plan.entity';
import { User } from '@models/users/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeSubscriptionId: string;

  @CreateDateColumn({ type: 'timestamp' })
  start: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  end: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  plan: Plan;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @Exclude()
  updatedAt: Date;
}
