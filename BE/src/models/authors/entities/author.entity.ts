import { Book } from '@models/books/entities/book.entity';
import LocalFile from '@models/local-files/entities/localFiles.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'authors' })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  email?: string | null;

  @Column({ name: 'phone_number', nullable: true, default: null })
  phoneNumber?: string | null;

  @Column({ nullable: true, default: false })
  published?: boolean | false;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @OneToOne(() => LocalFile, {
    nullable: true,
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  public avatar?: LocalFile;
}
