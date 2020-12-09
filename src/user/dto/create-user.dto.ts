import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class CreateUserDTO {
  @MinLength(3)
  @IsNotEmpty()
  readonly first_name: string;

  @MinLength(3)
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @Match('password')
  @IsNotEmpty()
  readonly password_confirmation: string;
}
