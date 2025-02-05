import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { CityDropdown } from '../elements';

export default function WeatherApp(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  const [time, setTime]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

  const [isWeatherIconClicked, setIsWeatherIconClicked]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(false);

  const [currentBackground, setCurrentBackground]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

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
      setCurrentBackground('');
    }
  };

  const getWeatherDetails = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude: latitude, longitude: longitude });
          },
          (error) => {
            console.log('error', error);
            reject('Error : Fetching user location coordinates');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
    });
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

  const getCurrentTime = (): string => {
    const time = new Date();
    let hours: number | string = time.getHours();
    let minutes: number | string = time.getMinutes();
    let seconds: number | string = time.getSeconds();
    let meridiem = 'AM';

    if (hours > 12) {
      hours = hours - 12;
      meridiem = 'PM';
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds} ${meridiem}`;
  };

  const dayObj = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };

  const getDayAndTime = () => {
    const date = new Date();
    const todayDate = date.toLocaleDateString();
    const day = date.getDay();

    const dayResult = dayObj[day as keyof typeof dayObj];

    return { todayDate, dayResult };
  };

  const { todayDate, dayResult }: { todayDate: string; dayResult: string } =
    getDayAndTime();

  const bgColor: string | null = localStorage.getItem('bgColor');

  useEffect(() => {
    const timeResult: string = getCurrentTime();
    setTime(timeResult);
  }, []);

  useEffect(() => {
    getWeatherDetails()
      .then(handleFetchData)
      .catch((err) => console.log('err', err));
  }, []);

  useEffect(() => {
    if (!isNaN(tempInCelcius)) {
      console.log('fn is working');
      handleCurrentBackground();
    }
  }, [tempInCelcius]);

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        bgColor === 'bg-cyan-200' ? 'text-black' : 'text-white'
      }`}
    >
      {data && data !== undefined && (
        <div
          className={`xl:w-1/4 w-full flex flex-col gap-28 h-screen rounded-lg mx-auto p-2.5 shadow-2xl`}
          style={{
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='flex justify-between'>
            <div>
              <p
                className={`${
                  bgColor === 'bg-cyan-200' ? 'text-black' : 'text-white'
                }`}
              >
                {time}
              </p>
            </div>
            <div>
              {!isWeatherIconClicked && bgColor === 'bg-cyan-200' ? (
                <MoonIcon
                  className='w-6 text-black cursor-pointer'
                  onClick={() => {
                    localStorage.setItem('bgColor', 'bg-violet-800');
                    setIsWeatherIconClicked(true);
                  }}
                />
              ) : (
                <SunIcon
                  className='w-6 text-white cursor-pointer'
                  onClick={() => {
                    localStorage.setItem('bgColor', 'bg-cyan-200');
                    setIsWeatherIconClicked(false);
                  }}
                />
              )}
            </div>
          </div>
          <CityDropdown data={data} setData={setData} />

          <div
            className={`w-2/3 h-1/3 flex flex-col text-xl justify-center items-center rounded-xl mx-auto ${
              bgColor === 'bg-violet-800'
                ? 'bg-black bg-opacity-50'
                : 'bg-white'
            } text-2xl`}
          >
            <p>{todayDate}</p>
            <p>{dayResult}</p>
            <p>{tempInCelcius}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}
