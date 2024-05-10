import { Component, inject } from "@angular/core";

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from "./dashboard.service";
import {  MatListModule } from '@angular/material/list'
import { RouterModule } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { tap } from "rxjs";
import { AuthenticationService } from "../core/services/authentication.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        RouterModule,
        AsyncPipe,
        MatListModule,
        MatButtonModule
    ]
})
export class DashboardComponent {
    dashboardService = inject(DashboardService);
    authService = inject(AuthenticationService);
}