import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MongodbService } from '../utils/services/mongodb.service';
import { ProductRepository } from './product.repository';
import { ProductCollection } from './product.type';
import { ProductDto, UpdateProductDto } from './product.dto';
import { ObjectId, WithId } from 'mongodb';

@Injectable()
export class ProductService implements ProductRepository {
  constructor(private readonly dbService: MongodbService) {}
  async create(product: ProductDto) {
    const db = await this.dbService.getMongodb();
    const productExists = await db
      .collection('products')
      .findOne({ id: product.sku });
    if (productExists)
      throw new BadRequestException('Product with given id already exists!');

    return await db.collection('products').insertOne(product);
  }

  async getAll(search: string, page: number, size: number) {
    const db = await this.dbService.getMongodb();
    const query: { sku?: string } = {};
    if (!!search) {
      query['sku'] = search;
    }

    const productsData = await db
      .collection<ProductCollection>('products')
      .aggregate([
        { $match: query },
        {
          $facet: {
            data: [{ $skip: page * size }, { $limit: size }],
            metadata: [{ $count: 'totalRecords' }],
          },
        },
      ])
      .toArray();

    return {
      data: productsData[0].data as Array<WithId<ProductCollection>>,
      totalRecords: productsData[0].metadata[0]?.totalRecords ?? 0,
    };
  }

  async update(product: UpdateProductDto) {
    const db = await this.dbService.getMongodb();
    const productExists = await db
      .collection<ProductCollection>('products')
      .findOne({ _id: new ObjectId(product._id) });

    if (!productExists) throw new NotFoundException('Product not found!');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...updatedProduct } = product;
    await db.collection<ProductCollection>('products').updateOne(
      { _id: new ObjectId(product._id) },
      {
        $set: updatedProduct,
      },
    );
    return { success: true, data: product };
  }
}
