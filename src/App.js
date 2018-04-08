import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import TodayWeather from './TodayWeather';
import SubsequentDayWeather from './SubsequentDayWeather';
import { convertForecastData } from './Utils';

// This would not be hard coded in a production (or normally even a dev) app
// Making an exception here as it's a free API and I am running out of time and having build issues with dotenv
const APP_ID = 'a9e87d2913472bf0762013886362a0e8';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayWeather: undefined,
      subsequentDaysWeather: undefined
    };
  }
  componentDidMount() {
    Promise.all([
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,UK&mode=json&units=metric&APPID=${APP_ID}`
      ).then(response => response.json()),
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,UK&units=metric&mode=json&APPID=${APP_ID}`
      ).then(response => response.json())
    ]).then(combinedResponses =>
      this.setState({
        todayWeather: combinedResponses[0],
        subsequentDaysWeather: convertForecastData(combinedResponses[1])
      })
    );
  }
  getSubsequentDays() {
    if (this.state.subsequentDaysWeather !== undefined) {
      return (
        <div className="subsequent-days-bar">
          {this.state.subsequentDaysWeather.map(day => (
            <SubsequentDayWeather
              key={day.dateString}
              minTemperature={day.minTemperature}
              maxTemperature={day.maxTemperature}
              description={day.description}
              icon={day.icon}
              dateString={day.dateString}
            />
          ))}
        </div>
      );
    }
    return <div />;
  }
  render() {
    const { todayWeather, subsequentDaysWeather } = this.state;
    if (todayWeather === undefined || subsequentDaysWeather === undefined) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    return (
      <div className="App">
        <TodayWeather
          description={todayWeather.weather[0].description}
          icon={todayWeather.weather[0].icon}
          temperature={todayWeather.main.temp}
        />
        {this.getSubsequentDays()}
      </div>
    );
  }
}

export default App;
