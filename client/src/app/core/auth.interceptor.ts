import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "./services/authentication.service";
import { EnvironmentService } from "./services/environment.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthenticationService);
  server = inject(EnvironmentService).server;

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = this.authService.token$.getValue();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next.handle(authReq).pipe(
      catchError(error => throwError(() => error.error?.msg || 'Diqka shkoi keq!'))
    );
  }
}