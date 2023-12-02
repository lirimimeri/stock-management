import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  id: string;

  @IsNumber()
  qty: number;

  @IsOptional()
  supplier: string;
}
