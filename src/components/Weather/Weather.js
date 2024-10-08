import React, { useEffect, useState } from 'react';
import './Weather.css';
import cloudiIcon from '../../images/cloudy.svg';
import rainIcon from '../../images/rain.svg';
import sunnyIcon from '../../images/sunny.svg';
import snowIcon from '../../images/snow.svg';

function Weather({ currentMeteo }) {
  const [currentImage, setCurrentImage] = useState('');
  // //новый массив с состояния погоды для значков
  // const currentMeteoArr = currentMeteo.map(function (el) {
  //   return el.weather;
  // });
  //пасмурно
  const regexCloudy = /\w*cloudy\w*/gi;
  //дождь
  const regexRain = /\w*rain\w*/gi;
  //ясно
  const regexClear = /\w*clear\w*/gi;
  //снег
  const regexSnow = /\w*snow\w*/gi;

  useEffect(() => {
    if (currentMeteo && currentMeteo.weather) {
      if (regexCloudy.test(currentMeteo.weather)) {
        setCurrentImage(cloudiIcon); // Меняем картинку на облачную
      } else if (regexRain.test(currentMeteo.weather)) {
        setCurrentImage(rainIcon); // Меняем картинку на дождевую
      } else if (regexClear.test(currentMeteo.weather)) {
        setCurrentImage(sunnyIcon); // Меняем картинку на ясную
      } else if (regexSnow.test(currentMeteo.weather)) {
        setCurrentImage(snowIcon); // Меняем картинку на снежную
      } else {
        setCurrentImage(cloudiIcon); // Убираем картинку, если погода не определена
      }
    }
  }, [currentMeteo]); // Добавляем currentMeteo в зависимости

  // const arr = currentMeteoArr.forEach((item) => {
  //   const reg = item.match(regexSnow);
  // });

  return (
    <section className="weather">
      <div className="wheater__info">
        <img className="weather__logo" src={currentImage} alt="Weather Icon" />
        <p className="weather__temperature">{currentMeteo.temp2m}°C</p>
      </div>
      <p className="wheater__city">Краснодар</p>
    </section>
  );
}

export default Weather;
