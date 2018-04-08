import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import TodayWeather from './TodayWeather';
import SubsequentDayWeather from './SubsequentDayWeather';

class App extends Component {
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
