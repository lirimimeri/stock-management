import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductDto } from "./product.dto";

@Controller('products')
export class ProductController {
    
    @Get()
    async getAll() {
        return [];
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() product: ProductDto) {
        console.log(product)
    }
}