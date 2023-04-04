import { AuthorsService } from '@models/authors/authors.service';
import { CreateBookDto } from '@models/books/dto/createBook.dto';
import { BaseService } from '@models/base/base.service';
import { CategoriesService } from '@models/categories/categories.service';
import { PublishersService } from '@models/publishers/publishers.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '@common/dtos';
import { LocalFilesService } from '@models/local-files/local-files.service';
import { DataSource } from 'typeorm';

@Injectable()
export class BooksService extends BaseService<Book, Repository<Book>> {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly categoriesService: CategoriesService,
    private readonly localFilesService: LocalFilesService,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(booksRepository);
  }

  public async getBooks(pageOptionsDto: PageOptionsDto) {
    const [items, itemCount] = await this.booksRepository.findAndCount({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(items, pageMetaDto);
  }

  public async searchForBooks(pageOptionsDto: PageOptionsDto) {
    const [items, itemCount] = await this.booksRepository.findAndCount({
      where: {
        name: Like(`%${pageOptionsDto.search?.toLowerCase() || ''}%`),
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        id: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(items, pageMetaDto);
  }

  public async create(data: CreateBookDto): Promise<Book> {
    const author = await this.authorsService.findById(data.author_Id);
    const publisher = await this.publishersService.findById(data.publisher_Id);
    const image = await this.localFilesService.getFileById(data?.image_Id);
    const softFile = await this.localFilesService.getFileById(
      data?.softFile_Id,
    );
    const category = await this.categoriesService.findById(data.category_Id);
    const createdBook = {
      ...data,
      category,
      author,
      publisher,
      image,
      softFile,
    };

    return await this.repository.save(createdBook);
  }

  public async deleteBook(id: number) {
    const book = await this.booksRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return await this.booksRepository.save({
      ...book,
      isDeleted: true,
    });
  }

  public async findBySlugCategory(
    slug: string,
    pageOptionsDto: PageOptionsDto,
  ) {
    const category = await this.categoriesService.findByCondition({ slug });

    if (!category) return [];

    const [items, itemCount] = await this.booksRepository.findAndCount({
      where: {
        name: Like(`%${pageOptionsDto?.search?.toLowerCase() || ''}%`),
        category: {
          id: category.id,
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        id: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(items, pageMetaDto);
  }
}
