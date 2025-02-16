import { useState, useMemo } from 'react';
import { ImagesGalleryType } from '../../types';
import { imagesGallery } from '../../utils/helper';
import { ApplyBackgroundCTA, CloseModalCTA } from '../atoms';

export default function ImageGalleryModal({
  isOpen,
  onClose,
  setCurrentBackground,
}: {
  isOpen: boolean;
  onClose: () => void;
  setCurrentBackground: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [clickedImage, setClickedImage] = useState<string>('');

  const handleImageClick = (clickedImgSrc: string) => {
    setClickedImage(clickedImgSrc);
  };

  const handleBackgroundApply = () => {
    setCurrentBackground(clickedImage);
    onClose();
  };

  const memoizedGallery: JSX.Element[] = useMemo(() => {
    return imagesGallery.map((gallery: ImagesGalleryType) => (
      <div key={gallery.category} className='flex flex-col gap-2'>
        <p className='text-black text-lg'>{gallery.category}</p>
        <div className='flex gap-2 w-[18%] h-20'>
          {gallery.images.map((imageSrc: string) => (
            <img
              key={imageSrc}
              src={imageSrc}
              alt={gallery.category}
              className={`rounded-lg min-w-full min-h-full cursor-pointer hover:scale-110 transition-all ${
                clickedImage === imageSrc ? 'border-4 border-blue-700' : ''
              }`}
              loading='lazy'
              onClick={() => handleImageClick(imageSrc)}
            />
          ))}
        </div>
      </div>
    ));
  }, [imagesGallery, clickedImage]);

  return (
    <div
      className={`absolute top-[6%] right-0 z-10 justify-center items-center w-full h-fit ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='relative w-full'>
        <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Select Background
            </h3>
            <CloseModalCTA onClose={onClose} />
          </div>
          <div className='px-4 md:px-5 pb-6 pt-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>{memoizedGallery}</div>
            <ApplyBackgroundCTA onApply={handleBackgroundApply} />
          </div>
        </div>
      </div>
    </div>
  );
}
