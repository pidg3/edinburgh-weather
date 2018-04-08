import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import TodayWeather from './TodayWeather';
import SubsequentDayWeather from './SubsequentDayWeather';
require('dotenv').config();

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
        'http://api.openweathermap.org/data/2.5/weather?q=Edinburgh,UK&mode=json&units=metric&APPID=' +
          process.env.REACT_APP_WEATHER_APP_ID
      ).then(response => response.json()),
      fetch(
        'http://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,UK&units=metric&mode=json&APPID=' +
          process.env.REACT_APP_WEATHER_APP_ID
      ).then(response => response.json())
    ]).then(combinedResponses =>
      this.setState({
        todayWeather: combinedResponses[0],
        subsequentDaysWeather: combinedResponses[1]
      })
    );
  }
  getSubsequentDays() {
    // TODO: add logic to get day reference in this helper
    return (
      <div className="subsequent-days-bar">
        <SubsequentDayWeather />
        <SubsequentDayWeather />
        <SubsequentDayWeather />
        <SubsequentDayWeather />
        <SubsequentDayWeather />
      </div>
    );
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
