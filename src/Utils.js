const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/*
  Takes a JS date object and prints it in following format:
  Sunday 8 April
*/
function prettifyDate(date) {
  return (
    DAYS_OF_WEEK[date.getDay()] +
    ' ' +
    date.getDate() +
    ' ' +
    MONTHS[date.getMonth()]
  );
}

/*
  Calculates number of calendar days betwen two dates
  Only counts full days ahead
*/
export function numberOfDaysBetweenDates(date1, date2) {
  // Set time to 00:00 for both dates
  date1.setHours(0);
  date1.setMinutes(0);
  date1.setSeconds(0);
  date1.setMilliseconds(0);
  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);
  date2.setMilliseconds(0);
  // 86400000 = 1 day
  return date1 / 86400000 - date2 / 86400000;
}

/*
  Gets data into separate arrays for each day, [0] tomorrow, [1] day after etc
*/
export function separateForecastIntoDays(forecastJson) {
  return forecastJson.list.reduce((accumulator, currentValue) => {
    const currentDate = new Date();
    const daysAhead = numberOfDaysBetweenDates(
      new Date(currentValue.dt * 1000),
      currentDate
    );
    const updatedAccumulator = accumulator;
    const dayIndex = daysAhead - 1;
    if (dayIndex >= 0) {
      // If we don't have an array in place for the day, add one to our accumulator
      if (Array.isArray(updatedAccumulator[dayIndex]) === false) {
        updatedAccumulator[dayIndex] = [];
      }
      // Push to this array
      updatedAccumulator[dayIndex].push(currentValue);
    }
    return updatedAccumulator;
  }, []);
}

/*
  Takes a weather forecast json in openweathermap default format
  Returns an array with 5 items, for each of subsequent days
  Each array item has:
  - dateString
  - minTemperature
  - maxTemperature
  - description
  - icon
*/
export function convertForecastData(forecastJson) {
  const forecastByDay = separateForecastIntoDays(forecastJson);
  return (
    forecastByDay
      .map(day => {
        let result = {};
        // 1) Add description, icon and date just based on 12 noon forecast
        const twelveNoonForecast = day.find(individualForecast => {
          const forecastDate = new Date(individualForecast.dt * 1000);
          // TODO: sort out this horrible hack (using 13), handle time zones properly
          if (forecastDate.getHours() === 13) return true;
          else return false;
        });
        // If we don't have a 12 noon forecast, don't use the day
        if (twelveNoonForecast === undefined) {
          return null;
        }
        result.dateString = prettifyDate(
          new Date(twelveNoonForecast.dt * 1000)
        );
        result.description = twelveNoonForecast.weather[0].description;
        result.icon = twelveNoonForecast.weather[0].icon;
        // 2) Work out rounded min and max temperatures by reducing over all forecasts for the day
        const minMaxTemperatures = day.reduce(
          (accumulator, currentValue) => {
            let updatedAccumulator = accumulator;
            updatedAccumulator.minTemperature = Math.min(
              accumulator.minTemperature,
              Math.round(currentValue.main.temp)
            );
            updatedAccumulator.maxTemperature = Math.max(
              accumulator.maxTemperature,
              Math.round(currentValue.main.temp)
            );
            return updatedAccumulator;
          },
          {
            minTemperature: 1000,
            maxTemperature: -273
          }
        );
        result.minTemperature = minMaxTemperatures.minTemperature;
        result.maxTemperature = minMaxTemperatures.maxTemperature;
        return result;
      })
      // Get rid of any null elements (i.e. if we don't have 12 noon forecast for them)
      .filter(day => day !== null)
  );
}
