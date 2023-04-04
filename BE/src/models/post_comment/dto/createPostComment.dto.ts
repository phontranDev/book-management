import { PartialType } from '@nestjs/mapped-types';
export class CreatePostCommentDto {
  content: string;
  postId: number;
  userId: number;
  parentId?: number;
}

export class EditPostCommentDto extends PartialType(CreatePostCommentDto) {}
