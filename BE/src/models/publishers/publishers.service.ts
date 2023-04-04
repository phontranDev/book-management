import { BaseService } from '@models/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService extends BaseService<
  Publisher,
  Repository<Publisher>
> {
  constructor(
    @InjectRepository(Publisher)
    private readonly publishersRepository: Repository<Publisher>,
  ) {
    super(publishersRepository);
  }

  public async findById(id: number) {
    if (!id) return null;

    return await this.publishersRepository.findOne({ where: { id } });
  }
}
