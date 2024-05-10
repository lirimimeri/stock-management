import { AsyncPipe, JsonPipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { MatTableModule } from '@angular/material/table'
import { map, switchMap, tap } from "rxjs";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatPaginator } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsService } from "../../shared/services/products.service";
import { ProductFormComponent } from "./components/product-form.component";
import { CreateProductDto, UpdateProductDto } from "../../shared/interfaces/product.interface";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    MatTableModule,
    MatDialogModule,
    AsyncPipe, 
    NgIf, 
    MatProgressSpinnerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    NgFor, 
    MatIconButton, 
    MatButton, 
    MatTooltip, 
    MatPaginator,
    JsonPipe,
    ReactiveFormsModule
  ]
})
export class ProductComponent implements OnInit {
  productsService = inject(ProductsService);
  dialog = inject(MatDialog);

  displayedColumns$ = this.productsService.tableColumns$.pipe(
    map(cols => cols.map(c => c.columnDef))
  );

  ctrlSearch = new FormControl('', { nonNullable: true });

  fg = new FormGroup({
    search: this.ctrlSearch,
    size: new FormControl(20, { nonNullable: true }),
    page: new FormControl(0, { nonNullable: true })
  });

  ngOnInit(): void {
    this.productsService.getProducts()
    this.fg.valueChanges.subscribe(value => {
      this.productsService.getProducts(value.search, value.page, value.size)
    });
  }

  openCreateProductDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, { width: '40rem' });

    dialogRef.componentInstance.created.pipe(
      switchMap(data => this.productsService.create(data)),
      tap(() => dialogRef.close())
    ).subscribe()
  }

  openEditProductDialog(product: UpdateProductDto) {
    const dialogRef = this.dialog.open(ProductFormComponent, { data: product, width: '40rem' });

    dialogRef.componentInstance.updated.pipe(
      switchMap(data => this.productsService.update(data)),
      tap(() => dialogRef.close())
    ).subscribe(console.log);
  }

  pageChanged(page: number) {
    this.fg.patchValue({ page });
  }

  searchClicked(search: string) {
    this.fg.patchValue({ search });
  }
  
}