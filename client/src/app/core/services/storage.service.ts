import { Injectable } from "@angular/core";

export const TOKEN_STORAGE = 'accessToken';
export const USER_STORAGE = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  }

  set(key: string, value: string | object) {
    if (typeof value === 'string')
      localStorage.setItem(key, value);
    else if (typeof value === 'object')
      localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
}