import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetAllDto, ProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getAll(@Query() query: GetAllDto) {
    const { search, size, page } = query;
    return await this.productService.getAll(search, page, size);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() product: ProductDto) {
    const writeResults = await this.productService.create(product);

    return { success: true, insertedId: writeResults.insertedId.toString() };
  }

  @Put()
  @UsePipes(ValidationPipe)
  async update(@Body() product: UpdateProductDto) {
    return await this.productService.update(product);
  }
}
