import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { MongodbService } from '../utils/services/mongodb.service';
import { UserCollection } from './user.type';
import { UserDto } from './user.dto';
import { AuthService } from '../utils/services/auth.service';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements UserRepository {
  constructor(
    private readonly dbService: MongodbService, 
    private readonly passwordService: AuthService,
    private readonly configService: ConfigService
  ) { }

  async getAll() {
    const db = await this.dbService.getMongodb();
    return await db.collection<UserCollection>('users').find().toArray();
  }

  async create(user: UserDto) {
    const db = await this.dbService.getMongodb();

    const userExists = await db.collection('users').findOne({ email: user.email });
    if (userExists)
      throw new BadRequestException({ msg: 'User with that email already exists!' });

    const hashedPassword = await this.passwordService.hashPassword(user.password);
    user.password = hashedPassword;

    const userToInsert = {
      ...user,
      createdAt: new Date(),
      isActive: true
    }

    return await db.collection('users').insertOne(userToInsert);
  }

  async login(userDto: UserDto) {
    const db = await this.dbService.getMongodb();
    
    const user = await db.collection<UserCollection>('users').findOne({ email: userDto.email });
    if (!user)
      throw new UnauthorizedException({ msg: 'Unauthorized!' });

    const isPasswordValid = await this.passwordService.verifyPassword(user.password, userDto.password);
    if (!isPasswordValid)
      throw new UnauthorizedException({ msg: 'Unauthorized!' });
  
    const secretKey = this.configService.get<string>('JWT_SECRET') || 'khXC7OtDVwMJGpoolGio';
    const token = sign({ userId: user._id }, secretKey, { expiresIn: '4h' });

    return { token };
  }
}
