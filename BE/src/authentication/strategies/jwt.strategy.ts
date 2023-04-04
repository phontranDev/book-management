// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Inject, Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import TokenPayload from '../interfaces/tokenPayload.interface';
// import { UsersService } from '@models/users/users.service';
// import { JwtConfigService } from '@config/jwt/config.service';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly jwtconfigService: JwtConfigService,
//     private readonly userService: UsersService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: Request) => {
//           return request?.cookies?.Authentication;
//         },
//       ]),
//       secretOrKey: jwtconfigService.secret,
//     });
//   }

//   async validate(payload: TokenPayload) {
//     return this.userService.findOneById(payload.userId);
//   }
// }
