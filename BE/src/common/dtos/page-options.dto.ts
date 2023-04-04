import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants';

export class PageOptionsDto {
  @Type(() => String)
  @IsOptional()
  readonly search?: string;

  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 5;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
