import { useEffect, useRef, useState } from 'react';
import CitySelectionWithSearch from './CitySelectionWithSearch';

export default function CityDropdown({
  data,
  setData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: any;
}): JSX.Element {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [cityDropdownRef, setIsDropdownMenuOpen]);
  return (
    <div
      className='flex items-center justify-center w-full'
      ref={cityDropdownRef}
    >
      <div className='relative group w-9/12'>
        <button
          className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
          onClick={() =>
            setIsDropdownMenuOpen((prevState: boolean) => !prevState)
          }
        >
          <span className='mr-2'>{data?.name}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5 ml-2 -mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        {isDropdownMenuOpen && (
          <CitySelectionWithSearch
            setData={setData}
            isDropdownOpen={isDropdownMenuOpen}
            setIsDropdownMenuOpen={setIsDropdownMenuOpen}
          />
        )}
      </div>
    </div>
  );
}
