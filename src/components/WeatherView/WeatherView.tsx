import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentGeolocation, defineGeolocation } from '../../store/slice';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { getWeather, selectWeather } from './slice';
import Image from 'react-bootstrap/Image'
import { WEATHER_IMG_URL } from '../../config/weather';
import styles from './WeatherView.module.css'

export const WeatherView: FC = (() => {
  const geo = useAppSelector(getCurrentGeolocation)
  const weather = useAppSelector(selectWeather)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getWeather({ lat: geo.lat, lon: geo.lon }))
  }, [geo, dispatch])

  return (
    <Card body className="h-100">
      <Card.Title>
        <span>
        <h1>
          {geo.name}: погода сейчас
          <span className={styles['geoloc-icon__span']}>
            <FontAwesomeIcon 
              className={styles['geoloc-icon']}
              icon={faLocationArrow}
              onClick={() => dispatch(defineGeolocation())}
            />
          </span>
        </h1>

        </span>
      </Card.Title>
      <div 
        className={styles['temp-block']}
      >
        { weather.temp }°
      </div> 
      { 
        weather?.icon ? 
        <Image className={styles['aligned-image']} src={`${WEATHER_IMG_URL}${weather.icon}.png`} /> : 
        null
      }

      <div style={{ display: 'inline-block' }} className="ms-2">
        <div>{ weather.description }</div>
        <div>ощущается как: { weather.feels_like }°</div>
      </div>
      
    </Card>
  );
})