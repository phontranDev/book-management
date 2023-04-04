import { UsersService } from './users.service';
import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  Get,
  UseGuards,
  UseInterceptors,
  Param,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { Express } from 'express';
import JwtAuthenticationGuard from '@authentication/guards/jwt-authentication.guard';
import LocalFilesInterceptor from '@common/interceptors/localFiles.interceptor';
import RequestWithUser from '@authentication/interfaces/requestWithUser.interface';
import { CreateUserDto, EditUserDto } from './dto/user.dto';
import { PageOptionsDto } from '@common/dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.usersService.searchForUsers(pageOptionsDto);
  }

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(request.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Post('save')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.usersService.create(userData);
  }

  @Post(':id/edit')
  async editUser(@Param('id') id: number, @Body() editUserData: EditUserDto) {
    return await this.usersService.updateUser(id, editUserData);
  }

  @Get(':id/user-following')
  async getUsersFollowing(@Param('id') id: number) {
    return await this.usersService.findUsersFllowing(id);
  }

  @Get(':name')
  async getUserByName(@Param('name') name: string) {
    return await this.usersService.findUserByName(name);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number) {
    return await this.usersService.deleteUser(id);
  }
}
