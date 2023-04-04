import { Book } from '@models/books/entities/book.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class LocalFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  mimetype: string;
}

export default LocalFile;
