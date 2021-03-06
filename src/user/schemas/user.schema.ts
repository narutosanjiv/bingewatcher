import * as bcrypt from 'bcryptjs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User as IUser } from '../interface/user.interface';
import { Exclude } from 'class-transformer';

export type UserDocument = Document | IUser;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  age: number;

  @Prop()
  password_reset_token: string;

  @Prop()
  confirmation_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (user_password): boolean {
  return bcrypt.compareSync(user_password, this.password);
};
