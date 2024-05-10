import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from "../core/services/authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authService = inject(AuthenticationService);
  router = inject(Router);
  
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

    authenticate(email: string, password: string) {
      this.loading$.next(true);
      this.error$.next(null)
      this.authService.authenticate(email, password).subscribe({
        next: () => {
          this.loading$.next(false);
        },
        error: err => {
          this.loading$.next(false);
          this.error$.next(err);
        }
      })
    }
}