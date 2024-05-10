import { Injectable, inject } from "@angular/core";
import { EnvironmentService } from "./environment.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server = inject(EnvironmentService).server;
  http = inject(HttpClient);
  private serverUrl = this.server.protocol + this.server.url;

  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    const queryParams = new URLSearchParams(); // Create URLSearchParams object
  
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams.append(key, params[key]); // Add each param to URLSearchParams
        }
      }
    }
  
    const fullUrl = `${this.serverUrl}/${url}${!!queryParams.toString() ? `?${queryParams.toString()}` : ''}`; // Build the full URL with params
    return this.http.get<T>(fullUrl);
  }

  post<T>(url: string, body: any): Observable<T> {
    const fullUrl = `${this.serverUrl}/${url}`;
    return this.http.post<T>(fullUrl, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    const fullUrl = `${this.serverUrl}/${url}`;
    return this.http.put<T>(fullUrl, body);
  }
}