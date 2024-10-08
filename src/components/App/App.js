import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import './App.css';
import Weather from '../Weather/Weather.js';
import ourApi from '../../components/Api/Api.js';
import TimeDate from '../TimeDate/TimeDate.js';
import Tasks from '../Tasks/Tasks.js';
import ImageSlider from '../ImageSlider/ImageSlider.js';
import night from '../../images/Night01.jpg';
import morning from '../../images/Morning02.jpg';
import day from '../../images/Day03.jpg';
import evening from '../../images/Evening04.jpg';

function App() {
  const [currentImage, setCurrentImage] = useState('');
  const [currentGeolocation, setCurrentGeolocation] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [dataseriesObject, setDataseriesObject] = useState('');
  const [currentMeteo, setCurrentMeteo] = useState([]);
  const [loading, setLoading] = useState(true);

  //смена картинок фона
  const updateImage = () => {
    //берем по 2 цифры часы и минуты
    const hhmm = new Date().toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (hhmm <= '06:00') {
      setCurrentImage(night);
    } else if (hhmm <= '12:00') {
      setCurrentImage(morning);
    } else if (hhmm <= '18:00') {
      setCurrentImage(day);
    } else {
      setCurrentImage(evening);
    }
  };

  //проверяет время каждую секунду
  useEffect(() => {
    updateImage();
    const interval = setInterval(updateImage, 1000);
    return () => clearInterval(interval);
  }, []);

  //разрешение на геолокацию
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 1000,
    });

  const fetchData = async () => {
    try {
      const data = await ourApi.fetchData();
      setCurrentMeteo(data.dataseries[0]);
    } catch (err) {
      console.log(`ошибка: ${err}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(currentMeteo);
  }, [currentMeteo]);

  return (
    <div className="page">
      <img className="pageBackground" src={currentImage} alt="Current Time" />
      <p className="pageTitle"></p>
      <Weather currentMeteo={currentMeteo} />
    </div>
  );
}

export default App;
