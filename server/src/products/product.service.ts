import { BadRequestException, Injectable } from '@nestjs/common';

import { MongodbService } from '../utils/services/mongodb.service';
import { ConfigService } from '@nestjs/config';
import { ProductRepository } from './product.repository';
import { ProductCollection } from './product.type';
import { InsertOneResult, Document } from 'mongodb';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService implements ProductRepository {
  constructor(
    private readonly dbService: MongodbService, 
  ) { }

  async create(product: ProductDto) {
    const db = await this.dbService.getMongodb();
    const productExists = await db.collection('products').findOne({ id: product.id });
    if (productExists) 
        throw new BadRequestException('Product with given id already exists!');

    return await db.collection('products').insertOne(product);
  } 

  async getAll() {
    const db = await this.dbService.getMongodb();
    return await db.collection<ProductCollection>('products').find().toArray();
  }
}
