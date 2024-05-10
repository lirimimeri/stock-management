import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products/products.component').then(c => c.ProductComponent),
    }
]