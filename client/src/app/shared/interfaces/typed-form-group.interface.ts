import { AbstractControl } from "@angular/forms";

export type TypedFormGroup<T> = { [key in keyof T]: AbstractControl<T[key]> };