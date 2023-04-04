import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '@models/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtConfigService } from '@config/jwt/config.service';
import { JwtConfigModule } from '@config/jwt/config.module';
import { MyJwtStrategy } from './strategies/jwtStrategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
        signOptions: {
          expiresIn: `${jwtConfigService.expiration_time}s`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, MyJwtStrategy],
})
export class AuthenticationModule {}
