import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@config/jwt/config.service';
import { UsersService } from '@models/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import TokenPayload from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtconfigService: JwtConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    await this.usersService.getUserExitByEmail(registrationData.email);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const createdUser = await this.usersService.create({
      ...registrationData,
      password: hashedPassword,
    });
    return createdUser;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtconfigService.expiration_time}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async validateUser(payload: TokenPayload): Promise<any> {
    const user = await this.usersService.validateUserById(payload.userId);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  public createToken(userId: number) {
    const payload: TokenPayload = { userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: this.jwtconfigService.expiration_time,
      accessToken,
    };
  }
}
