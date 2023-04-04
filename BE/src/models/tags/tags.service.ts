import { BaseService } from '@models/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService extends BaseService<Tag, Repository<Tag>> {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {
    super(tagsRepository);
  }

  async findTagByTitles(titles: string[]) {
    const condition = {
      title: In(titles),
    };
    return await this.findAllByCondition(condition);
  }
}
