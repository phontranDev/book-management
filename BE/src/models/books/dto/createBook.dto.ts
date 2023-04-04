import { PartialType } from '@nestjs/mapped-types';
export class CreateBookDto {
  id: number;

  name: string;

  slug: string;

  content?: string | null;

  pageNumber: number;

  published?: boolean | false;

  author_Id: number | undefined;

  publisher_Id?: number;

  category_Id: number;

  image_Id?: number | undefined;

  softFile_Id?: number | undefined;

  isDeleted?: boolean | false;
}

export class EditBookDto extends PartialType(CreateBookDto) {}
