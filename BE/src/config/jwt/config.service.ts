import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }
  get expiration_time(): number {
    return this.configService.get<number>('jwt.expiration_time');
  }
  get refresh_token_secret(): string {
    return this.configService.get<string>('jwt.refresh_token_secret');
  }
  get refresh_token_expiration_time(): number {
    return this.configService.get<number>('jwt.refresh_token_expiration_time');
  }
}
