import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUser: CreateUserDTO): Promise<User> {
    const user = new this.userModel(createUser);
    return user.save();
  }

  async validate(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({ email }, (err, user) => {
        if (user.comparePassword(password)) {
          resolve(user);
        } else {
          reject(new Error('Username/password incorrect'));
        }
      });
    });
  }
}
