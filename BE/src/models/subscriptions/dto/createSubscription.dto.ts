import { PartialType } from '@nestjs/mapped-types';
export class CreateSubScriptionDto {
  stripePriceId: string;
}

export class EditSubScriptionDto extends PartialType(CreateSubScriptionDto) {}
