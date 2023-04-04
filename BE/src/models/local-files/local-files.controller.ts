import {
  Controller,
  Get,
  Param,
  Res,
  ParseIntPipe,
  StreamableFile,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { multerOptions } from '@common/uploads/config/multerOptions';
import LocalFilesInterceptor from '@common/interceptors/localFiles.interceptor';

@Controller('local-files')
@UseInterceptors(ClassSerializerInterceptor)
export class LocalFilesController {
  constructor(private readonly localFilesService: LocalFilesService) {}

  @Post('/save-img')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/images',
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
  async uploadImage(@UploadedFile() file) {
    console.log(file);
    return await this.localFilesService.saveLocalFileData(file);
  }

  @Post('/save-avatar')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid avatar'),
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
  async uploadAvatar(@UploadedFile() file) {
    return await this.localFilesService.saveLocalFileData(file);
  }

  @Post('/save-pdf')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/pdfs',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('pdf')) {
          return callback(
            new BadRequestException('Provide a valid pdf'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadPdfFile(@UploadedFile() file) {
    console.log(file);
    return await this.localFilesService.saveLocalFileData(file);
  }

  @Post('/save-webp')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/webps',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('webp')) {
          return callback(
            new BadRequestException('Provide a valid webp'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadWebpFile(@UploadedFile() file) {
    console.log(file);
    return await this.localFilesService.saveLocalFileData(file);
  }

  @Get(':id')
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.localFilesService.getFileById(id);

    const stream = createReadStream(join(process.cwd(), file.path));

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
  }
}
