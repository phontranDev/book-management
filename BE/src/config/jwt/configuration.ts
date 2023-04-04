import { registerAs } from '@nestjs/config';
export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiration_time: process.env.JWT_EXPIRATION_TIME,
  refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refresh_token_expiration_time: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
}));
