import { BaseService } from '@models/base/base.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto, EditCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends BaseService<
  Category,
  Repository<Category>
> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  public async create(data: CreateCategoryDto): Promise<Category> {
    const category = await this.findByCondition({
      name: data.name,
    });
    if (category) {
      throw new BadRequestException('Already exist');
    }
    const result = await this.categoryRepository.create(data);
    if (result) {
      return this.categoryRepository.save(result);
    }
    throw new BadRequestException('Create Faild');
  }

  async findCategoryByIds(ids: number[]) {
    const condition = {
      id: In(ids),
    };
    return await this.findByIds(condition);
  }

  public async updateCategory(
    id: number,
    data: EditCategoryDto,
  ): Promise<Category> {
    await this.findOneById(id);

    const result = await this.update(id, data);

    if (result) {
      return this.categoryRepository.save(result);
    }
    throw new BadRequestException('Create Faild');
  }

  public async findById(id: number) {
    if (!id) return null;
    return await this.categoryRepository.findOne({ where: { id } });
  }

  public async getAll() {
    return await this.categoryRepository.find();
  }

  public async findBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({ where: { slug } });
    if (!category)
      throw new NotFoundException(`Category with slug ${slug} not found`);
    return category;
  }
}
