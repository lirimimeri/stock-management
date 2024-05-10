import { InsertOneResult, WithId } from 'mongodb';
import { ProductCollection } from './product.type';
import { ProductDto, UpdateProductDto } from './product.dto';

export interface ProductRepository {
  getAll: (
    search: string,
    page: number,
    size: number,
  ) => Promise<{
    data: Array<WithId<ProductCollection>>;
    totalRecords: number;
  }>;
  create: (product: ProductDto) => Promise<InsertOneResult>;
  update: (
    product: UpdateProductDto,
  ) => Promise<{ success: boolean; data: ProductDto }>;
}
