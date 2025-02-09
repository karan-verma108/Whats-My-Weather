export const dayObj: Record<number, string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

export const getCurrentTime = (): string => {
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

export const getDayAndTime = () => {
  const date = new Date();
  const todayDate = date.toLocaleDateString();
  const day = date.getDay();

  const dayResult = dayObj[day as keyof typeof dayObj];

  return { todayDate, dayResult };
};

export const getWeatherDetails = () => {
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

const randomImages = [''];

export const defaultCityOptions: {
  id: number;
  city: string;
}[] = [
  {
    id: 1,
    city: 'Mumbai',
  },
  {
    id: 2,
    city: 'Tokyo',
  },
  {
    id: 3,
    city: 'Kathmandu',
  },
  {
    id: 4,
    city: 'Beijing',
  },
];
