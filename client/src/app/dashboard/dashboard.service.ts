import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DashboardService {
    isOpen$ = new BehaviorSubject(false);

    constructor() { }

    toggleSidebar() {
        this.isOpen$.next(!this.isOpen$.getValue());
    }
}