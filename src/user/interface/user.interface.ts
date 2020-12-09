import { Document } from 'mongoose';

export interface User extends Document {
  comparePassword(password: string): boolean;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  password: string;
}
