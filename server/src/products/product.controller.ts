import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @Get()
    async getAll() {
        return await this.productService.getAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() product: ProductDto) {
        const writeResults = await this.productService.create(product);

        return { success: true, insertedId: writeResults.insertedId.toString() };
    }
}