import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http"
import type { User } from "../../shared/interfaces/user.interface";
import { Router } from "@angular/router";
import { StorageService, TOKEN_STORAGE, USER_STORAGE } from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private storage = inject(StorageService);

    isAuthenticated$ = new BehaviorSubject<boolean>(false);
    token$ = new BehaviorSubject<string | null>(null);
    user$ = new BehaviorSubject<User | null>(null);

    constructor() {
        this.isAuthenticated$.pipe(
            tap(authenticated => {
                if (!authenticated) {
                    this.token$.next(null);
                    this.user$.next(null)
                    this.router.navigateByUrl('/login');
                    return;
                }

                this.router.navigateByUrl('/dashboard');
            })
        ).subscribe()
    }

    authenticate(email: string, password: string) {
        return this.http.post<{ token: string; user: User }>('http://localhost:4000/users/login', { email, password })
            .pipe(
                tap(res => {
                    this.token$.next(res.token);
                    this.isAuthenticated$.next(true);
                    this.user$.next(res.user);

                    this.storage.set(TOKEN_STORAGE, res.token);
                    this.storage.set(USER_STORAGE, res.user);
                })
            );
    }

    storageAuthenticate() {
        const token: string | null = this.storage.get(TOKEN_STORAGE);
        if (!token) return;

        const tokenPayload = this.decodeJwtToken(token);
        console.log(tokenPayload)

        const expiration: number = tokenPayload.exp;
        if (Date.now() < expiration * 1000) {
            const user: User | null = this.storage.get(USER_STORAGE);
            if (!user) return;

            this.user$.next(user);
            this.token$.next(token)
            this.isAuthenticated$.next(true);
        }
    }

    logout() {
        this.storage.remove(TOKEN_STORAGE);
        this.storage.remove(USER_STORAGE);
        this.isAuthenticated$.next(false);
    }

    decodeJwtToken(token: string) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        try {
            // Base64 decode header and payload
            const decodedPayload = atob(parts[1]);

            // Parse header and payload as JSON (assuming UTF-8 encoding)
            const payload = JSON.parse(decodedPayload);

            return payload;
        } catch (error) {
            return null;
        }
    }
}