export const TableLayout: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          <th scope='col' className='px-6 py-3'>
            Emri
          </th>
          <th scope='col' className='px-6 py-3'>
            Sasia
          </th>
          <th scope='col' className='px-6 py-3'>
            Sasia per dalje
          </th>
        </tr>
      </thead>
      <tbody>
        { children }
      </tbody>
    </table>
  );
};
