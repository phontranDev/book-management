import { BaseService } from '@models/base/base.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService extends BaseService<Author, Repository<Author>> {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {
    super(authorsRepository);
  }

  public async findAllAuthor() {
    return await this.authorsRepository.find({});
  }
  public async findById(id: number) {
    const author = await this.authorsRepository.findOne({
      where: { id },
    });

    if (!author) throw new NotFoundException(`Author with id ${id} not found`);

    return author;
  }
}
