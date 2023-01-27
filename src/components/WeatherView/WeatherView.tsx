import { FC, useEffect, useRef, createContext, createRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentGeolocation, defineGeolocation } from '../../store/slice';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { getWeather, selectWeather } from './slice';
import Image from 'react-bootstrap/Image'
import { WEATHER_IMG_URL } from '../../config/weather';

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
          <span style={{float: 'right', cursor: 'pointer'}}>
            <FontAwesomeIcon 
              style={{ fontSize: '24px'}}
              icon={faLocationArrow}
              onClick={() => dispatch(defineGeolocation())}
            />
          </span>
        </h1>

        </span>
      </Card.Title>
      <div 
        style={{ fontSize: '42px', display: 'inline-block' }}
      >
        { weather.temp }°
      </div> 
      { 
        weather?.icon ? 
        <Image style={{ width: '50px', verticalAlign: 'top' }} src={`${WEATHER_IMG_URL}${weather.icon}.png`} /> : 
        null
      }

      <div style={{ display: 'inline-block' }} className="ms-2">
        <div>{ weather.description }</div>
        <div>ощущается как: { weather.feels_like }°</div>
      </div>
      
    </Card>
  );
})