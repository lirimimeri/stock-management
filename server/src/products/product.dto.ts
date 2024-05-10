import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  price: number;

  @IsOptional()
  supplier: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  sku: string;

  @IsOptional()
  qty: number;

  @IsOptional()
  price: number;

  @IsOptional()
  supplier: string;
}

export class GetAllDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value ?? 0))
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value ?? 0))
  size: number;
}
