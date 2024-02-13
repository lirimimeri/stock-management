import { ProductListItemResponseDto } from '../../products/utils/types';

interface Props {
  product: ProductListItemResponseDto;
}

export const ProductRow: React.FC<Props> = ({ product }) => {
  return (
    <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {product.name}
      </th>
      <td className='px-6 py-4'>{product.qty}</td>
      <td className='px-6 py-4 uppercase flex flex-row justify-between'>
        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Ndrysho</button>
        <button className='font-medium text-green-600 dark:text-green-500 hover:underline'>Shto ne dalje</button>
      </td>
    </tr>
  );
};
