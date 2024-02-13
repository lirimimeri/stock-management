import { useContext } from 'react';
import { outcomesContext } from '../utils/context';
import { ProductRow } from './components/product-row';
import { TableLayout } from './components/table-layout';

export const Outcomes = () => {
  const { outcomeProducts } = useContext(outcomesContext);

  const products = Object.keys(outcomeProducts).map((productId) => {
    return <ProductRow product={outcomeProducts[productId]} key={productId} />;
  });

  return (
    <div className='container mx-auto p-4 h-full'>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <TableLayout>{products}</TableLayout>
      </div>
    </div>
  );
};
