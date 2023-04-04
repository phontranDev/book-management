import { PartialType } from '@nestjs/mapped-types';
export class CreatePostDto {
  name: string;

  slug: string;

  content: string;

  title: string;

  tags: string[];

  author: number;

  published: boolean;

  coverImg: string;

  isDeleted?: boolean | false;
}

export class EditPlanDto extends PartialType(CreatePostDto) {}
