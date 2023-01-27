import { FC, useEffect, useRef, createContext, createRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentGeolocation, setGeolocation } from '../../store/slice';
import Card from 'react-bootstrap/Card';
import { getForecast, selectForecast } from './slice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'
import { WEATHER_IMG_URL } from '../../config/weather';

export const ForecastView: FC = (() => {
  const geo = useAppSelector(getCurrentGeolocation)
  const forecast = useAppSelector(selectForecast)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getForecast({ lat: geo.lat, lon: geo.lon }))
  }, [geo, dispatch])

  return (
    <Card body className="h-100">
      <Card.Title>
        <span>
        <h1>
          Погода на 5 дней
        </h1>

        </span>
      </Card.Title>
      <Row style={{marginTop: '75px'}}>
        {forecast.map((f, index: number) => {
          return (
            <Col 
              key={index}
              style={{ textAlign: 'center' }}
            > 
              <h4>{f.day}</h4>
              <div>
                { 
                  f?.icon ? 
                    <Image 
                      style={{ width: '50px', verticalAlign: 'top' }} 
                      src={`${WEATHER_IMG_URL}${f.icon}.png`} 
                    /> : 
                    null
                }
              </div>
              <div><h5>{f.temp}°</h5></div>
              <div>{f.description}</div>
              <div>ощущается как {f.feels_like}°</div>
            </Col>
          )
        })}
      </Row>

    </Card>
  );
})