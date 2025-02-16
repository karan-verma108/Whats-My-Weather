import { getDayAndTime } from '../../utils/helper';
import { UpdateBackgroundCTA } from '../atoms';

const { todayDate, dayResult }: { todayDate: string; dayResult: string } =
  getDayAndTime();

export default function WeatherAndTimeDetails({
  temp,
  bgColor,
  setIsOpen,
}: {
  temp: number;
  bgColor: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <div
      className={`relative w-2/3 h-1/3 flex flex-col text-xl justify-center items-center rounded-xl mx-auto ${
        bgColor === 'bg-violet-800'
          ? 'bg-white opacity-75'
          : 'bg-black opacity-75'
      } text-2xl`}
    >
      <p className='text-3xl leading-10 font-medium'>{todayDate}</p>
      <p className='text-3xl leading-10 font-medium'>{dayResult}</p>
      <p className='text-3xl leading-10 font-medium'>{temp}°C</p>
      <UpdateBackgroundCTA bgColor={bgColor} setIsOpen={setIsOpen} />
    </div>
  );
}
