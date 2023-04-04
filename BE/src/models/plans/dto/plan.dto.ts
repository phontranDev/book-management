import { PartialType } from '@nestjs/mapped-types';
export class CreatePlanDto {
  name: string;

  price: number;

  currency: string;
}

export class EditPlanDto extends PartialType(CreatePlanDto) {}
