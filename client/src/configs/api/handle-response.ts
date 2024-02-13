export const BASE_URL = import.meta.env.VITE_SERVER_URL

interface ErrorResponse {
    msg: string;
    success?: boolean;
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.msg || 'Something went wrong!');
    }
    
    return response.json();
};