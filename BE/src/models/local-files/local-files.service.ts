import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFile from './entities/localFiles.entity';

@Injectable()
export class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private readonly localFilesRepository: Repository<LocalFile>,
  ) {}

  public async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = await this.localFilesRepository.create(fileData);
    return await this.localFilesRepository.save(newFile);
  }

  async getFileById(fileId: number) {
    if (!fileId) return null;

    const file = await this.localFilesRepository.findOne({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${fileId} not found`);
    }

    return file;
  }
}
