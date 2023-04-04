import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationService } from '@authentication/authentication.service';
import TokenPayload from '@authentication/interfaces/tokenPayload.interface';
import { JwtConfigService } from '@config/jwt/config.service';

@Injectable()
export class MyJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly jwtconfigService: JwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtconfigService.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
