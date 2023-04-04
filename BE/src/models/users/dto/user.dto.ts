import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  avatar_Id?: number;

  phoneNumber?: string;

  address?: string;

  isBanned?: boolean;
}

export class EditUserDto extends PartialType(CreateUserDto) {
  id: number;
}
