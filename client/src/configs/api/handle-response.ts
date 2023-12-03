export const BASE_URL = import.meta.env.VITE_SERVER_URL

export const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }
    
    return response.json();
};