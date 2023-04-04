import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getAll() {
    return await this.authorsService.findAllAuthor();
  }
}
