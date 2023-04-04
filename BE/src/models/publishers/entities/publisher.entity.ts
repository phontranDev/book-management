import { Book } from '@models/books/entities/book.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'publishers' })
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  address?: string | null;

  @Column({ nullable: true, default: null })
  email?: string | null;

  @Column({ name: 'phone_number', nullable: true, default: null })
  phoneNumber?: string | null;

  @Column({ nullable: true, default: false })
  published?: boolean | false;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];

  @Column({ nullable: true, default: null, name: 'logo_url' })
  logoUrl?: string | null;
}
