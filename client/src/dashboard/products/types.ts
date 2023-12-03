export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
}


export interface ProductListItemResponseDto {
  _id: string;
  id: string;
  name: string;
  supplier?: string;
  qty: number;
}