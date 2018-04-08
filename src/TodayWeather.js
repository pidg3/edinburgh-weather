import React from 'react';

export default function TodayWeather(props) {
  return (
    <div className="today-weather-container">
      <h1>Today's Weather in Edinburgh</h1>
      <p>
        <span style={{ fontWeight: 700 }}>Temperature:</span>{' '}
        {Math.round(props.temperature)}
      </p>
      <p>
        <span style={{ fontWeight: 700 }}>Description:</span>{' '}
        {props.description}
      </p>
      <img
        className="weather-icon"
        alt="Icon showing weather description"
        src={`http://openweathermap.org/img/w/${props.icon}.png`}
      />
    </div>
  );
}
