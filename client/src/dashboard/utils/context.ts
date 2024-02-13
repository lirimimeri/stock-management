import { createContext } from "react";
import { ProductListItemResponseDto } from "../products/utils/types";

export interface DashboardContextProps {
  outcomeProducts: { [productId: string]: ProductListItemResponseDto };
  addOutcome: (product: ProductListItemResponseDto) => void;
}

const defaultContextValue: DashboardContextProps = {
  outcomeProducts: {},
  addOutcome: () => {}, // You can provide a default function or leave it empty based on your use case.
};


export const outcomesContext = createContext<DashboardContextProps>(defaultContextValue);