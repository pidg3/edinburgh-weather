import React from 'react';

export default function SubsequentDayWeather(props) {
  return (
    <div className="subsequent-day-weather-container">
      <h2 className="add-text-margin">{props.dateString}</h2>
      <p className="add-text-margin">
        <span style={{ fontWeight: 700 }}>Min Temperature:</span>{' '}
        {props.minTemperature}
      </p>
      <p className="add-text-margin">
        <span style={{ fontWeight: 700 }}>Max Temperature:</span>{' '}
        {props.maxTemperature}
      </p>
      <p className="add-text-margin">
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
