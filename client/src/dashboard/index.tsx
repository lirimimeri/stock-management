import { useState } from 'react'

import { Routes } from './routes';
import { Sidebar } from './components/sidebar';
import { ProductListItemResponseDto } from './products/utils/types';
import { outcomesContext } from './utils/context'

export const Dashboard = () => {
  const [outcomeProducts, setOutcomeProducts] = useState<{ [productId: string]: ProductListItemResponseDto }>({});

  const addOutcome = (product: ProductListItemResponseDto) => {
    if (!outcomeProducts[product._id]) {
      // If the product is not in the list, add it with quantity 1
      setOutcomeProducts(prevState => ({ ...prevState, [product._id]: product }));
    }
  };

  return <outcomesContext.Provider value={{ outcomeProducts, addOutcome }}>
      <Sidebar />
      <Routes />
    </outcomesContext.Provider>
};
