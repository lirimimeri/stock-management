import { BASE_URL, handleResponse } from "./handle-response";

export const post = async <T>(endpoint: string, data?: any, token?: string): Promise<T> => {
    const url = `${BASE_URL}/${endpoint}`;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
}