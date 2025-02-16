import { ImagesGalleryType } from '../types';

export const dayObj: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
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
          reject(`Error : Fetching user location coordinates ${error}`);
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

export const imagesGallery: ImagesGalleryType[] = [
  {
    id: 1,
    category: 'Nature',
    images: [
      'https://wallpaper.forfun.com/fetch/fb/fbec7a4913ea78eda4303e96d4042f4d.jpeg',
      'https://i.pinimg.com/736x/cf/d5/74/cfd574575f0b21c42dda5db476aa7f3b.jpg',
      'https://adminassets.devops.arabiaweather.com/sites/default/files/field/image/filip-zrnzevic-_EMkxLdko9k-unsplash.jpg',
      'https://wallpaper.forfun.com/fetch/64/6473e19c6c31cfb0c17f827af1512aa6.jpeg',
      'https://i0.wp.com/www.3wallpapers.fr/wp-content/uploads/2023/12/wallpaper_iphone_nature_03-scaled.jpg?ssl=1',
    ],
  },
  {
    id: 2,
    category: 'Girls',
    images: [
      'https://images.pexels.com/photos/3387577/pexels-photo-3387577.jpeg?cs=srgb&dl=pexels-arshamhaghani-3387577.jpg&fm=jpg',
      'https://images.pexels.com/photos/1572878/pexels-photo-1572878.jpeg?cs=srgb&dl=pexels-krivitskiy-1572878.jpg&fm=jpg',
      'https://i.pinimg.com/736x/c6/2f/e3/c62fe3c5bcee65f8a491a8d4b5552a13.jpg',
      'https://i.pinimg.com/736x/84/ca/c0/84cac07d3780df162f858bbf6649b7bd.jpg',
      'https://wallpapercave.com/wp/wp7605169.jpg',
    ],
  },
  {
    id: 3,
    category: 'Boys',
    images: [
      'https://images.ottplay.com/webstories/wp-content/uploads/2024/10/7-iconic-roles-of-Akshay-Kumar-1.jpg',
      'https://i.pinimg.com/736x/2d/09/55/2d0955c0568bf9996aa7ff15849c5337.jpg',
      'https://wallpapers.com/images/hd/arnold-schwarzenegger-heavy-big-muscle-d7w6h5bjn6xxe9nd.jpg',
      'https://i.pinimg.com/736x/48/d4/bd/48d4bd0ca35641b6a68c20403cd74709.jpg',
      'https://lh6.googleusercontent.com/proxy/_d65mM8yLYEWJkiB3uhYyMMpo1WBUYC5_mhD2jt28cEowE2Oo5oHdbQh89YtdrQIsB4SpBby6p3tcjnGal6-SWILivatGotMlggYBoSt4FNpKw5emsYJWIJ4xEH1WthPiItLCMEhcg',
    ],
  },
  {
    id: 4,
    category: 'City',
    images: [
      'https://images.unsplash.com/photo-1512864733469-8c0d7cc3ccf5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNpdHklMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D',
      'https://wallpapercave.com/wp/wp8708395.jpg',
      'https://w0.peakpx.com/wallpaper/643/21/HD-wallpaper-city-night-dark-building-lights-blue-city-lights-vertical-portrait-display-black-cyberpunk-cyan.jpg',
      'https://images.pexels.com/photos/2884590/pexels-photo-2884590.jpeg?cs=srgb&dl=pexels-karlsolano-2884590.jpg&fm=jpg',
      'https://c4.wallpaperflare.com/wallpaper/381/543/598/architecture-fall-lake-new-york-city-portrait-display-usa-building-central-park-car-birds-eye-view-city-park-grass-rooftops-house-road-skyscraper-taxi-water-trees-street-church-contrast-nature-wallpaper-preview.jpg',
    ],
  },
];

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
