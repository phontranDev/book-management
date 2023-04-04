import { AuthorsModule } from '@models/authors/authors.module';
import { CategoriesModule } from '@models/categories/categories.module';
import { LocalFilesModule } from '@models/local-files/local-files.module';
import { PublishersModule } from '@models/publishers/publishers.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorsModule,
    PublishersModule,
    CategoriesModule,
    LocalFilesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
