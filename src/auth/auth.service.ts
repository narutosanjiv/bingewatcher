import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  generateToken(email: string): string {
    return this.jwtService.sign({ email });
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.validate(email, password)
      return {
        access_token: this.generateToken(email),
        user_id: user.id,
      };
    } catch (err) {
      return {
        status: 404,
        message: 'Incorrect email/password',
      };
    }
  }
}
