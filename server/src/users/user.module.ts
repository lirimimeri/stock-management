import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongodbService } from '../utils/services/mongodb.service';
import { AuthService } from '../utils/services/auth.service';
import { AuthMiddleWare } from '../utils/middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, MongodbService, AuthService],
})
export class UserModule implements NestModule, OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.userService.createDefaultUser();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes('users/*');
  }
}
