import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import LogInDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { AuthenticationService } from './authentication.service';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authenticationService.register(registrationData);
    const token = this.authenticationService.createToken(user.id);
    return {
      user,
      ...token,
    };
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Body() loginDto: LogInDto) {
    const { email, password } = loginDto;

    const user = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );

    const token = this.authenticationService.createToken(user.id);

    return {
      user,
      ...token,
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return { user };
  }
}
