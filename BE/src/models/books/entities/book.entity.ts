import { Author } from '@models/authors/entities/author.entity';
import { Category } from '@models/categories/entities/category.entity';
import LocalFile from '@models/local-files/entities/localFiles.entity';
import { Publisher } from '@models/publishers/entities/publisher.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true, default: null, type: 'longtext' })
  content?: string | null;

  @Column({ nullable: true, default: false })
  isDeleted: boolean;

  @OneToOne(() => LocalFile, {
    nullable: true,
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  public image?: LocalFile;

  @OneToOne(() => LocalFile, {
    nullable: true,
    eager: true,
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  public softFile?: LocalFile;

  @Column({ name: 'page_number' })
  pageNumber: number;

  @Column({ nullable: true, default: false })
  published?: boolean | false;

  @ManyToOne(() => Author, (author) => author.books, {
    nullable: true,
    eager: true,
  })
  author: Author;

  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: true,
    eager: true,
  })
  publisher: Publisher;

  @ManyToOne(() => Category, (category) => category.books, {
    nullable: true,
    eager: true,
  })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
