import { IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface LoginSuccessDTO {
  access_token: string;
  id: string;
}

export interface LoginErrorDTO {
  status?: number;
  message?: string;
}
