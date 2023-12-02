import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongodbService } from '../utils/services/mongodb.service';
import { AuthService } from 'src/utils/services/auth.service';
import { AuthMiddleWare } from 'src/utils/middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, MongodbService, AuthService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).exclude('users/login').forRoutes('users/*')
  }
}
