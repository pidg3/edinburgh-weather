import React from 'react';

export default function TodayWeather(props) {
  return (
    <div className="today-weather-container">
      <span>Today's Weather!</span>
      <span>Temperature: {props.temperature}</span>
      <span>Description: {props.description}</span>
      <span>Icon: {props.icon}</span>
    </div>
  );
}
