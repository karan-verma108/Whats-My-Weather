import React, { useEffect, useState } from 'react';

import {
  CityDropdown,
  TimeWithThemeToggler,
  WeatherAndTimeDetails,
} from '../elements';
import { getCurrentTime, getWeatherDetails } from '../../utils/helper';
import ImageGalleryModal from '../modals/ImageGalleryModal';

export default function WhatsMyWeather(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  const [time, setTime]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

  const [currentBackground, setCurrentBackground]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

  const [isOpen, setIsOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor'));

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    const newBgColor =
      bgColor === 'bg-cyan-200' ? 'bg-violet-800' : 'bg-cyan-200';
    setBgColor(newBgColor);
    localStorage.setItem('bgColor', newBgColor);
  };

  const tempFromApi: string = (data?.main?.temp - 273.15).toFixed(2);
  let tempInCelcius: number = Number(tempFromApi);

  const handleCurrentBackground = (): void => {
    tempInCelcius = Number(Math.round(tempInCelcius));

    const currentDay: Date = new Date();
    const currentHour: number = currentDay.getHours();

    if (tempInCelcius > 20 && currentHour < 12) {
      setCurrentBackground(
        'https://img.freepik.com/premium-photo/italian-vineyard-landscape-with-hous_926199-203543.jpg'
      );
    } else if (tempInCelcius < 20 && currentHour < 20) {
      setCurrentBackground(
        'https://ai.flux-image.com/flux/4ad8f4da-597e-4648-9099-5739e47f4919.jpg'
      );
    } else if (tempInCelcius > 20 && currentHour > 12 && currentHour <= 16) {
      setCurrentBackground(
        'https://st2.depositphotos.com/4164031/8139/i/450/depositphotos_81398650-stock-photo-green-field-under-the-sun.jpg'
      );
    } else if (currentHour >= 16 && currentHour <= 18) {
      setCurrentBackground(
        'https://i.pinimg.com/474x/03/30/4f/03304f4db69facda5fb01bc837750c1f.jpg'
      );
    } else if (currentHour >= 18 && currentHour <= 23) {
      setCurrentBackground(
        'https://storage.ko-fi.com/cdn/useruploads/display/59388fac-810b-4777-808c-bf52ad7ffaa8_xstrangee_a_man_and_a_woman_in_a_convertible_car_on_top_of_a__4c49ccc1-4eab-4e46-8f5b-3e369d0b7f15_3.png'
      );
    } else {
      setCurrentBackground(
        'https://wallpaper.forfun.com/fetch/64/6473e19c6c31cfb0c17f827af1512aa6.jpeg'
      );
    }
  };

  function handleFetchData(value: unknown): void | PromiseLike<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { latitude, longitude }: any = value;

    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.VITE_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log('err', err));
  }

  setTimeout(() => {
    const timeResult: string = getCurrentTime();
    setTime(timeResult);
  }, 1000);

  useEffect(() => {
    getWeatherDetails()
      .then(handleFetchData)
      .catch((err) => console.log('err', err));
  }, []);

  useEffect(() => {
    if (!isNaN(tempInCelcius)) {
      handleCurrentBackground();
    }
  }, [tempInCelcius]);

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        bgColor === 'bg-cyan-200' ? 'text-white' : 'text-black'
      }`}
    >
      {data && data !== undefined && (
        <div
          className={`relative xl:w-1/4 w-full flex flex-col gap-28 h-screen rounded-lg mx-auto p-2.5 shadow-2xl`}
          style={{
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <TimeWithThemeToggler time={time} onThemeToggle={handleThemeToggle} />
          <CityDropdown data={data} setData={setData} />
          <WeatherAndTimeDetails
            temp={tempInCelcius}
            bgColor={bgColor}
            setIsOpen={setIsOpen}
          />
          <ImageGalleryModal
            isOpen={isOpen}
            onClose={handleModalClose}
            setCurrentBackground={setCurrentBackground}
          />
        </div>
      )}
    </div>
  );
}
