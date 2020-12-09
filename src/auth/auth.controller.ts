import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, LoginErrorDTO, LoginSuccessDTO } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body() logindto: LoginDTO,
  ): Promise<LoginErrorDTO> | Promise<LoginSuccessDTO> {
    this.logger.debug(logindto);
    const res = this.authService.validateUser(
      logindto.email,
      logindto.password,
    );
    return res;
  }
}
