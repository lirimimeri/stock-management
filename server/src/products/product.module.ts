import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongodbService } from 'src/utils/services/mongodb.service';
import { AuthMiddleWare } from 'src/utils/middlewares/auth.middleware';
import { AuthService } from 'src/utils/services/auth.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, MongodbService, AuthService],
})
export class ProductModule /* implements NestModule */ {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes('products/*');
  }
}
