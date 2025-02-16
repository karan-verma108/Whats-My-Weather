import React, { useState } from 'react';
import { defaultCityOptions } from '../../utils/helper';

interface DefaultCityOptionsType {
  id: number;
  city: string;
}

export default function CitySelectionWithSearch({
  setData,
  isDropdownOpen,
  setIsDropdownMenuOpen,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: any;
  isDropdownOpen: boolean;
  setIsDropdownMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [city, setCity] = useState<string>('');
  const bgColor: string | null = localStorage.getItem('bgColor');

  const fetchWeatherData = (cityName: string) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.VITE_WEATHER_API_KEY}`
    )
      .then((res) => res.json().then((data) => setData(data)))
      .catch((err) => console.log('err', err));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim().length > 0) {
      fetchWeatherData(city);
      setCity('');
      setIsDropdownMenuOpen(false);
    }
  };

  const handleAdditionCityClick = (additionalCity: string) => {
    fetchWeatherData(additionalCity);
    setCity(additionalCity);
    setIsDropdownMenuOpen(false);
  };

  return (
    <form
      className={`w-full absolute mt-2 rounded-md shadow-lg ${
        bgColor === 'bg-cyan-200' ? 'bg-black' : 'bg-white'
      } ring-1 hover:bg-slate-400 ring-slate-200 p-1 space-y-1`}
      onSubmit={handleCitySubmit}
    >
      <input
        id='city'
        name='city'
        value={city}
        autoFocus={isDropdownOpen}
        className={`block w-full px-4 py-2 ${
          bgColor === 'bg-cyan-200'
            ? 'text-white placeholder:text-white'
            : 'text-black placeholder:text-black'
        } border rounded-md border-gray-300 focus:outline-none`}
        type='text'
        onChange={handleCityChange}
        placeholder='Search a city...'
      />
      {defaultCityOptions.length > 0 &&
        defaultCityOptions.map((cityOptions: DefaultCityOptionsType) => (
          <p
            key={cityOptions.id}
            className={`block px-4 py-2 ${
              bgColor === 'bg-cyan-200'
                ? 'text-white hover:bg-gray-100 hover:text-black'
                : 'text-black hover:bg-orange-300 hover:text-white'
            } cursor-pointer rounded-md`}
            onClick={() => handleAdditionCityClick(cityOptions.city)}
          >
            {cityOptions.city}
          </p>
        ))}
    </form>
  );
}
