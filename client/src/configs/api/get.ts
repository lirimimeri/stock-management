// apiGet.ts

import { handleResponse, BASE_URL } from './handle-response';

export const get = async <T>(endpoint: string, params?: Record<string, any>, token?: string): Promise<T> => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    headers,
  });
  return handleResponse<T>(response);
};