import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

export class EditCategoryDto extends PartialType(CreateCategoryDto) {}
