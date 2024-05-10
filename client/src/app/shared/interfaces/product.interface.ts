export interface CreateProductDto {
    name: string;
    sku: string;
    qty: number;
    price: number;
    supplier: string | null;
}

export interface UpdateProductDto extends CreateProductDto {
    _id: string;
}

export interface ProductTableRow {
    _id: string;
    name: string;
    sku: string;
    qty: number;
    price: number;
    supplier: string | null;
}