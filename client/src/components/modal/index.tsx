import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen ? (
        <div className='fixed inset-0 flex items-center justify-center overflow-y-auto'>
          <div className='fixed inset-0 bg-black opacity-25'></div>
          <div className='relative p-4 bg-white rounded-lg shadow-xl transform transition-all max-w-md w-full'>
            <button className='absolute top-0 right-0 p-4' onClick={onClose}>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
            <div className='p-4'>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
