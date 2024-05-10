import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, map, of, tap, withLatestFrom } from "rxjs";
import { CreateProductDto, ProductTableRow, UpdateProductDto } from "../interfaces/product.interface";
import { ApiService } from "../../core/services/api.service";

const COLUMNS = [
  {
    columnDef: 'name',
    header: 'Emri',
    cell: (element: ProductTableRow) => `${element.name}`,
  },
  {
    columnDef: 'sku',
    header: 'Shifra',
    cell: (element: ProductTableRow) => `${element.sku}`,
  },
  {
    columnDef: 'price',
    header: 'Cmimi',
    cell: (element: ProductTableRow) => `${element.price * 120} rsd`,
  },
  {
    columnDef: 'stock',
    header: 'Stoku',
    cell: (element: ProductTableRow) => `${element.qty}`,
  },
  {
    columnDef: 'actions',
    header: '',
    cell: (element: ProductTableRow) => '',
  }
]

@Injectable({ providedIn: 'root' })
export class ProductsService {
  api = inject(ApiService);

  products$ = new BehaviorSubject<Array<ProductTableRow>>([]);
  totalRecords$ = new BehaviorSubject<number>(0);

  getProducts(search: string = '', page: number = 0, size: number = 20) {
    return this.api.get<{
      data: Array<ProductTableRow>;
      totalRecords: number
      }>('products', { search, page, size })
      .subscribe(data => {
        this.products$.next(data.data);
        this.totalRecords$.next(data.totalRecords);
      })
  }

  create(product: CreateProductDto) {
    return this.api.post<{ success: boolean; insertedId: string }>('products', product).pipe(
      tap(response => {
        // const products = this.products$.getValue();
        // this.products$.next([...products, { ...product, _id: response.insertedId }])
      })
    );
  }

  update(product: UpdateProductDto) {
    return this.api.put<{ success: boolean; data: ProductTableRow }>('products', product).pipe(
      withLatestFrom(this.products$),
      tap(([response, products]) => {
        const index = products.findIndex(p => p._id === response.data._id);
        if (index === -1) return;

        const updatedProducts = [...products];

        updatedProducts[index] = response.data;
        this.products$.next(updatedProducts);
      })
    );
  }

  tableColumns$ = of(COLUMNS);
}