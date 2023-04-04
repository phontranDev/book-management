export interface BaseInterfaceService<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findWithRelations(relations: any): Promise<T[]>;

  findAll(): Promise<T[]>;

  remove(id: number);
}
