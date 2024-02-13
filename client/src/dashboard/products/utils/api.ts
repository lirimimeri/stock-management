import { ProductListItemResponseDto, Todo } from "./types";
import { apiService } from '../../../configs/api'

export async function getTodos(): Promise<Array<Todo>> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) 
    throw new Error('Error while fetching todos');
  
  return response.json();
}

export async function getProducts() {
  return await apiService.get<Array<ProductListItemResponseDto>>('products');
}

// export async function createProduct(product) {
//   return apiService.post<>
// }