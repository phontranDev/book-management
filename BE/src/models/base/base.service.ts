import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { BaseInterfaceService } from './interfaces/base.interface.service';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements BaseInterfaceService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }
  public async create(data: T | any): Promise<T> {
    const result: any = await this.repository.create(data);
    if (result) {
      return this.repository.save(result);
    }
    throw new BadRequestException('Create Faild');
  }

  public async findOneById(id: number): Promise<T> {
    const data = await this.repository.findOne({ where: { id } as any });
    if (!data) {
      throw new NotFoundException(`${id} Not Found`);
    }
    return data;
  }

  public async findOneBySlug(slug: string): Promise<T> {
    const data = await this.repository.findOne({ where: { slug } as any });
    if (!data) {
      throw new NotFoundException(`${slug} Not Found`);
    }
    return data;
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.repository.findOne({ where: filterCondition });
  }

  public async findOneWithRelations(
    condition: any,
    relations: any,
  ): Promise<T> {
    const result = await this.repository.findOne({
      where: condition,
      relations,
    });
    if (!result) throw new NotFoundException('Not Found');
    return result;
  }

  public async findByIds(filterCondition: any): Promise<T[]> {
    return await this.repository.find({ where: filterCondition });
  }

  public async findAllByCondition(condition: any): Promise<T[]> {
    return await this.repository.find({ where: condition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.repository.find(relations);
  }

  public async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async remove(id: number) {
    await this.findOneById(id);
    return await this.repository.delete(id);
  }

  public async update(id: number, data: T | any): Promise<T> {
    const updated = await this.repository.update(id, data);
    if (updated) return this.findOneById(id);
    throw new BadRequestException('Update Faild');
  }
}
