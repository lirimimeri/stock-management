import { InsertOneResult, WithId } from "mongodb";
import { ProductCollection } from "./product.type";
import { ProductDto } from "./product.dto";

export interface ProductRepository {
    getAll: () => Promise<Array<WithId<ProductCollection>>>;
    create: (product: ProductDto) => Promise<InsertOneResult>;
}