import { useState } from 'react';

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
  const [city, setCity]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>('');

  const handleCityChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VITE_WEATHER_API_KEY}`
    )
      .then((res) => res.json().then((data) => setData(data)))
      .catch((err) => console.log('err', err));

    setCity('');
    setIsDropdownMenuOpen(false);
  };

  const handleAdditionCityClick = (additionalCity: string): void => {
    setCity(additionalCity);
  };

  return (
    <form
      className='w-full absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1'
      onSubmit={handleCitySubmit}
    >
      <input
        id='city'
        name='city'
        value={city}
        autoFocus={isDropdownOpen}
        className='block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none'
        type='text'
        onChange={handleCityChange}
        placeholder='Search a city...'
      />
      <p
        className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
        onClick={() => handleAdditionCityClick('Mumbai')}
      >
        Mumbai
      </p>
      <p
        className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
        onClick={() => handleAdditionCityClick('Tokyo')}
      >
        Tokyo
      </p>
      <p
        className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
        onClick={() => handleAdditionCityClick('California')}
      >
        California
      </p>
      <p
        className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
        onClick={() => handleAdditionCityClick('Beijing')}
      >
        Beijing
      </p>
    </form>
  );
}
