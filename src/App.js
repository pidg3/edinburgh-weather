import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import TodayWeather from './TodayWeather';
import SubsequentDayWeather from './SubsequentDayWeather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodayWeather />
        <div className="subsequent-days-bar">
          <SubsequentDayWeather />
          <SubsequentDayWeather />
          <SubsequentDayWeather />
          <SubsequentDayWeather />
          <SubsequentDayWeather />
        </div>
      </div>
    );
  }
}

export default App;
