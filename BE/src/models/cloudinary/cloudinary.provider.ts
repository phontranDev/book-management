import { CloudinaryConfigService } from '@config/cloudinary/config.service';
import { v2 } from 'cloudinary';
export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (config: CloudinaryConfigService) => {
    return v2.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });
  },
  inject: [CloudinaryConfigService],
};
