export default function TimeWithThereToggler({
  time,
  onThemeToggle,
}: {
  time: string;
  onThemeToggle: () => void;
}): JSX.Element {
  const bgColor: string | null = localStorage.getItem('bgColor');

  return (
    <div className='flex justify-between'>
      <p
        className={`${
          bgColor === 'bg-cyan-200'
            ? 'text-white bg-black opacity-50 rounded-md p-2'
            : 'text-black bg-white opacity-50 rounded-md p-2'
        }`}
      >
        {time}
      </p>
      <div>
        {bgColor === 'bg-cyan-200' ? (
          <img
            src='/assets/moonImg.png'
            alt='moon'
            className='w-12 h-12 cursor-pointer'
            onClick={onThemeToggle}
          />
        ) : (
          <img
            src='/assets/sunImg.png'
            alt='sun'
            className='w-12 h-12 cursor-pointer'
            onClick={onThemeToggle}
          />
        )}
      </div>
    </div>
  );
}
