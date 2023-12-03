import { Todo } from "./types";

export async function getTodos(): Promise<Array<Todo>> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) 
    throw new Error('Error while fetching todos');
  
  return response.json();
}