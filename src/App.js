import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import TodayWeather from './TodayWeather';
import SubsequentDayWeather from './SubsequentDayWeather';
require('dotenv').config();

class App extends Component {
  componentDidMount() {
    fetch(
      'http://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,UK&mode=json&APPID=' +
        process.env.REACT_APP_WEATHER_APP_ID
    )
      .then(response => response.json())
      .then(json => console.log(json));
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
    return (
      <div className="App">
        <TodayWeather />
        {this.getSubsequentDays()}
      </div>
    );
  }
}

export default App;
