import { useState } from 'react';
import { useQuery } from 'react-query';

import { getProducts } from './utils/api';
import { ProductListItem } from './components/product.tsx';
import { Modal } from '../../components/modal';
import { Create } from './components/create.tsx';
import { Pagination } from '../../components/pagination/index.tsx';

export const Products = () => {
  const [createProductIsOpened, setCreateProductIsOpened] = useState(false);

  const { data } = useQuery({
    queryKey: ['products'],
    refetchOnWindowFocus: false,
    queryFn: getProducts,
    keepPreviousData: true,
  });

  const toggleModal = () => {
    setCreateProductIsOpened(prevState => !prevState);
  }

  return (
    <div className='container mx-auto p-4 h-full'>
      <div className='flex justify-between items-center'>
        <form>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div>
              <label htmlFor='first_name' className='block mb-2 text-sm font-medium text-gray-900'>
                Kerko
              </label>
              <input
                type='text'
                id='first_name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focs:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder='produkti...'
                required
              />
            </div>
          </div>
        </form>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={toggleModal}>Krijo Produktin</button>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Emri
              </th>
              <th scope='col' className='px-6 py-3'>
                Shifra
              </th>
              <th scope='col' className='px-6 py-3'>
                Sasia
              </th>
              <th scope='col' className='px-6 py-3 w-64'>
                Veprimet
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <ProductListItem key={item._id} product={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* <Pagination /> */}

      <Modal isOpen={createProductIsOpened} onClose={toggleModal}>
        <h4>Krijo Produktin</h4>
        <Create />
      </Modal>
    </div>
  );
};
