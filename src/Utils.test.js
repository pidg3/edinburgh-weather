import timekeeper from 'timekeeper';
import { convertForecastData } from './Utils';

it('converts weather json to correct format', () => {
  // Set date to Sun Apr 08 2018 11:16:33 GMT+0100 (BST)
  const manuallySetTime = new Date(1523182593555);
  timekeeper.freeze(manuallySetTime);
  // This is a cut down version that just contains data for 8th, 9th, 10th April
  const mockResponse = {
    cod: '200',
    message: 0.0035,
    cnt: 40,
    list: [
      {
        dt: 1523188800,
        main: {
          temp: 11.16,
          temp_min: 9.68,
          temp_max: 11.16,
          pressure: 996.09,
          sea_level: 1021.46,
          grnd_level: 996.09,
          humidity: 96,
          temp_kf: 1.48
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 76 },
        wind: { speed: 2.21, deg: 248.009 },
        rain: { '3h': 0.0025 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-08 12:00:00'
      },
      {
        dt: 1523199600,
        main: {
          temp: 11.63,
          temp_min: 10.52,
          temp_max: 11.63,
          pressure: 996.25,
          sea_level: 1021.52,
          grnd_level: 996.25,
          humidity: 85,
          temp_kf: 1.11
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: { all: 88 },
        wind: { speed: 2.08, deg: 260.5 },
        rain: {},
        sys: { pod: 'd' },
        dt_txt: '2018-04-08 15:00:00'
      },
      {
        dt: 1523210400,
        main: {
          temp: 9.8,
          temp_min: 9.06,
          temp_max: 9.8,
          pressure: 997.1,
          sea_level: 1022.32,
          grnd_level: 997.1,
          humidity: 87,
          temp_kf: 0.74
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 80 },
        wind: { speed: 1.88, deg: 270.002 },
        rain: { '3h': 0.9425 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-08 18:00:00'
      },
      {
        dt: 1523221200,
        main: {
          temp: 7.51,
          temp_min: 7.14,
          temp_max: 7.51,
          pressure: 998.14,
          sea_level: 1023.61,
          grnd_level: 998.14,
          humidity: 97,
          temp_kf: 0.37
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 36 },
        wind: { speed: 1.75, deg: 234.503 },
        rain: { '3h': 0.8225 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-08 21:00:00'
      },
      {
        dt: 1523232000,
        main: {
          temp: 4.7,
          temp_min: 4.7,
          temp_max: 4.7,
          pressure: 998.31,
          sea_level: 1023.93,
          grnd_level: 998.31,
          humidity: 95,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 12 },
        wind: { speed: 2.33, deg: 232.501 },
        rain: { '3h': 0.0225 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-09 00:00:00'
      },
      {
        dt: 1523242800,
        main: {
          temp: 3.81,
          temp_min: 3.81,
          temp_max: 3.81,
          pressure: 997.67,
          sea_level: 1023.42,
          grnd_level: 997.67,
          humidity: 95,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 0 },
        wind: { speed: 2.07, deg: 237.003 },
        rain: { '3h': 0.0175 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-09 03:00:00'
      },
      {
        dt: 1523253600,
        main: {
          temp: 1.91,
          temp_min: 1.91,
          temp_max: 1.91,
          pressure: 997.19,
          sea_level: 1022.92,
          grnd_level: 997.19,
          humidity: 91,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 20 },
        wind: { speed: 1.31, deg: 195.501 },
        rain: { '3h': 0.0050000000000001 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-09 06:00:00'
      },
      {
        dt: 1523264400,
        main: {
          temp: 7.13,
          temp_min: 7.13,
          temp_max: 7.13,
          pressure: 996.79,
          sea_level: 1022.27,
          grnd_level: 996.79,
          humidity: 100,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 32 },
        wind: { speed: 1.82, deg: 200.007 },
        rain: { '3h': 0.025 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-09 09:00:00'
      },
      {
        dt: 1523275200,
        main: {
          temp: 10.29,
          temp_min: 10.29,
          temp_max: 10.29,
          pressure: 995.37,
          sea_level: 1020.69,
          grnd_level: 995.37,
          humidity: 98,
          temp_kf: 0
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: { all: 32 },
        wind: { speed: 1.71, deg: 149.5 },
        rain: {},
        sys: { pod: 'd' },
        dt_txt: '2018-04-09 12:00:00'
      },
      {
        dt: 1523286000,
        main: {
          temp: 10.54,
          temp_min: 10.54,
          temp_max: 10.54,
          pressure: 993.49,
          sea_level: 1018.81,
          grnd_level: 993.49,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 80 },
        wind: { speed: 2.57, deg: 130.001 },
        rain: { '3h': 0.41 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-09 15:00:00'
      },
      {
        dt: 1523296800,
        main: {
          temp: 10.07,
          temp_min: 10.07,
          temp_max: 10.07,
          pressure: 992.59,
          sea_level: 1017.99,
          grnd_level: 992.59,
          humidity: 81,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 48 },
        wind: { speed: 3.86, deg: 118.501 },
        rain: { '3h': 0.16 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-09 18:00:00'
      },
      {
        dt: 1523307600,
        main: {
          temp: 6.62,
          temp_min: 6.62,
          temp_max: 6.62,
          pressure: 993.69,
          sea_level: 1019.13,
          grnd_level: 993.69,
          humidity: 88,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 8 },
        wind: { speed: 3.76, deg: 111.001 },
        rain: { '3h': 0.01 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-09 21:00:00'
      },
      {
        dt: 1523318400,
        main: {
          temp: 4.53,
          temp_min: 4.53,
          temp_max: 4.53,
          pressure: 993.79,
          sea_level: 1019.34,
          grnd_level: 993.79,
          humidity: 96,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 68 },
        wind: { speed: 2.96, deg: 78.5023 },
        rain: { '3h': 0.02 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-10 00:00:00'
      },
      {
        dt: 1523329200,
        main: {
          temp: 5.27,
          temp_min: 5.27,
          temp_max: 5.27,
          pressure: 994.1,
          sea_level: 1019.7,
          grnd_level: 994.1,
          humidity: 98,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 92 },
        wind: { speed: 4.51, deg: 68.0045 },
        rain: { '3h': 0.515 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-10 03:00:00'
      },
      {
        dt: 1523340000,
        main: {
          temp: 4.71,
          temp_min: 4.71,
          temp_max: 4.71,
          pressure: 995.22,
          sea_level: 1020.88,
          grnd_level: 995.22,
          humidity: 98,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 92 },
        wind: { speed: 5.81, deg: 61.5026 },
        rain: { '3h': 0.55 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-10 06:00:00'
      },
      {
        dt: 1523350800,
        main: {
          temp: 4.88,
          temp_min: 4.88,
          temp_max: 4.88,
          pressure: 997.04,
          sea_level: 1022.59,
          grnd_level: 997.04,
          humidity: 99,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 92 },
        wind: { speed: 6.31, deg: 54.0034 },
        rain: { '3h': 0.86 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-10 09:00:00'
      },
      {
        dt: 1523361600,
        main: {
          temp: 5.65,
          temp_min: 5.65,
          temp_max: 5.65,
          pressure: 998.27,
          sea_level: 1023.76,
          grnd_level: 998.27,
          humidity: 100,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 92 },
        wind: { speed: 6.57, deg: 50.5009 },
        rain: { '3h': 1.24 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-10 12:00:00'
      },
      {
        dt: 1523372400,
        main: {
          temp: 5.96,
          temp_min: 5.96,
          temp_max: 5.96,
          pressure: 998.91,
          sea_level: 1024.45,
          grnd_level: 998.91,
          humidity: 100,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 92 },
        wind: { speed: 5.66, deg: 51.0027 },
        rain: { '3h': 1.12 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-10 15:00:00'
      },
      {
        dt: 1523383200,
        main: {
          temp: 5.65,
          temp_min: 5.65,
          temp_max: 5.65,
          pressure: 999.87,
          sea_level: 1025.41,
          grnd_level: 999.87,
          humidity: 100,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
        ],
        clouds: { all: 92 },
        wind: { speed: 5.82, deg: 48.5056 },
        rain: { '3h': 0.94 },
        sys: { pod: 'd' },
        dt_txt: '2018-04-10 18:00:00'
      },
      {
        dt: 1523394000,
        main: {
          temp: 5.14,
          temp_min: 5.14,
          temp_max: 5.14,
          pressure: 1000.93,
          sea_level: 1026.68,
          grnd_level: 1000.93,
          humidity: 100,
          temp_kf: 0
        },
        weather: [
          { id: 500, main: 'Rain', description: 'light rain', icon: '10n' }
        ],
        clouds: { all: 92 },
        wind: { speed: 6.01, deg: 50.0012 },
        rain: { '3h': 0.86 },
        sys: { pod: 'n' },
        dt_txt: '2018-04-10 21:00:00'
      }
    ],
    city: {
      id: 2650225,
      name: 'Edinburgh',
      coord: { lat: 55.9521, lon: -3.1965 },
      country: 'GB',
      population: 435791
    }
  };
  expect(convertForecastData()).toEqual([
    {
      dateString: 'Monday 9 April',
      minTemperature: 2,
      maxTemperature: 11,
      description: 'scattered clouds',
      icon: '03d'
    },
    {
      dateString: 'Tuesday 10 April',
      minTemperature: 5,
      maxTemperature: 6,
      description: 'light rain',
      icon: '10d'
    }
  ]);
  timekeeper.reset();
});
