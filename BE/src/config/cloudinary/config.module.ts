import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { CloudinaryConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CLOUDINARY_NAME: Joi.string(),
        CLOUDINARY_API_KEY: Joi.string(),
        CLOUDINARY_API_SECRET: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, CloudinaryConfigService],
  exports: [ConfigService, CloudinaryConfigService],
})
export class CloudinaryConfigModule {}
