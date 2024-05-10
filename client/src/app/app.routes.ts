import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        loadChildren: () => import('./dashboard/dashboard.routes').then(r => r.routes)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
