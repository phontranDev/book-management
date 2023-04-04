import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class CloudinaryConfigService {
  constructor(private configService: ConfigService) {}

  get cloudName(): string {
    return this.configService.get<string>('cloudinary.cloudName');
  }
  get apiKey(): string {
    return this.configService.get<string>('cloudinary.apiKey');
  }
  get apiSecret(): string {
    return this.configService.get<string>('cloudinary.apiSecret');
  }
}
