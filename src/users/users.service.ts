import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const foundUser = await this.userModel.findOne({ email }).exec();

    if (foundUser) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const foundUser = await this.findUserById(_id);

    await this.userModel.findOneAndUpdate({ _id }, { $set: updateUserDto }).exec();
  }

  async listAllUsers(): Promise<User[]> {
    return await this.userModel.find().populate('contacts').exec();
  }

  async findUserById(_id: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ _id }).populate('contacts').exec();

    if (!foundUser) {
      throw new NotFoundException(`User with id ${_id} not found`);
    }

    return foundUser;
  }

  async findUserByUserName(username: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ username }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return foundUser;
  }

  async deleteUser(_id: string): Promise<any> {
    const foundUser = await this.findUserById(_id);

    return await this.userModel.deleteOne({ _id }).exec();
  }

  async loginUser(loginUser: LoginUserDto): Promise<User> {
    const { username, password } = loginUser;

    const foundUser = await this.userModel.findOne({ email: username }).exec();

    if (!foundUser || foundUser.password !== password) {
      throw new NotFoundException(`Invalid username or password`);
    }

    const secretKey = process.env.JWT_SECRET || 'mysecretkey';
    const token = jwt.sign({ sub: foundUser._id }, secretKey);

    return { ...foundUser, token };
  }
}
