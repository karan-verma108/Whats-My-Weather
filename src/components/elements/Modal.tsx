import { useState } from 'react';
import { ImagesGalleryType } from '../../types';
import { imagesGallery } from '../../utils/helper';

export default function Modal({
  isOpen,
  onClose,
  setCurrentBackground,
}: {
  isOpen: boolean;
  onClose: () => void;
  setCurrentBackground: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [clickedImage, setClickedImage]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

  const handleImageClick = (clickedImgSrc: string) => {
    setClickedImage(clickedImgSrc);
  };

  const handleBackgroundSave = () => {
    setCurrentBackground(clickedImage);
    onClose();
  };
  return (
    <div
      className={`absolute top-[6%] right-0 z-10 justify-center items-center w-full h-fit ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='relative  w-full'>
        <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Choose Background
            </h3>
            <button
              type='button'
              onClick={onClose}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-toggle='timeline-modal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-4 md:p-5 flex flex-col gap-3'>
            <div>
              {imagesGallery.length > 0 &&
                imagesGallery.map((gallery: ImagesGalleryType) => (
                  <div key={gallery.category} className='flex flex-col gap-2'>
                    <p className='text-black text-lg'>{gallery.category}</p>
                    <div className='flex gap-2 w-[18%] h-20'>
                      {gallery.images.length > 0 &&
                        gallery.images.map((imageSrc: string) => (
                          <img
                            key={imageSrc}
                            src={imageSrc}
                            alt={gallery.category}
                            className={`rounded-lg min-w-full min-h-full cursor-pointer hover:scale-110 transition-all ${
                              clickedImage === imageSrc
                                ? 'border-4 border-blue-700'
                                : ''
                            }`}
                            onClick={() => handleImageClick(imageSrc)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>

            <button
              onClick={handleBackgroundSave}
              className='text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
