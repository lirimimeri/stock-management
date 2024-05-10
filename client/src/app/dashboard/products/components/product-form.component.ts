import { Component, EventEmitter, Inject, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { CreateProductDto, UpdateProductDto } from "../../../shared/interfaces/product.interface";
import type { TypedFormGroup } from "../../../shared/interfaces/typed-form-group.interface";
import { MatError, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatError
  ]
})
export class ProductFormComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public product?: UpdateProductDto) {}
  fb = inject(FormBuilder);

  @Output() created = new EventEmitter<CreateProductDto>();
  @Output() updated = new EventEmitter<UpdateProductDto>();


  form = this.fb.group<TypedFormGroup<CreateProductDto & { _id: string | null }>>({
    _id: this.fb.control<string | null>(null),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    sku: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    qty: this.fb.control<number>(0, { nonNullable: true, validators: [Validators.required] }),
    price: this.fb.control<number>(0, { nonNullable: true, validators: [Validators.required] }),
    supplier: this.fb.control<string | null>({ value: null, disabled: true }),
  });

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product)
    }
  }

  send() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();
    if (formValue._id) {
      this.updated.emit(formValue as UpdateProductDto);
    } else {
      const { _id, ...createData } = formValue;
      this.created.emit(createData as CreateProductDto);
    }
  }
}
