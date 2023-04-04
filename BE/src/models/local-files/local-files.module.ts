import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { LocalFilesController } from './local-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './entities/localFiles.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([LocalFile])],
  providers: [LocalFilesService],
  controllers: [LocalFilesController],
  exports: [LocalFilesService],
})
export class LocalFilesModule {}
