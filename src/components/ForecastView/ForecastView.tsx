import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCurrentGeolocation } from '../../store/slice';
import Card from 'react-bootstrap/Card';
import { 
  getForecast, 
  selectForecast, 
  selectDayForecast, 
  setDayForecast,
  clearDayForecast
} from './slice'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { WEATHER_IMG_URL } from '../../config/weather';
import styles from './ForecastView.module.css'
import { MainForecastItem } from './slice'

export const ForecastView: FC = (() => {
  const geo = useAppSelector(getCurrentGeolocation)
  const forecast = useAppSelector(selectForecast)
  const dayForecast = useAppSelector(selectDayForecast)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getForecast({ lat: geo.lat, lon: geo.lon }))
    dispatch(clearDayForecast())
  }, [geo, dispatch])

  const chooseDayForecast = (f: MainForecastItem) => {
    if (!dayForecast) dispatch(setDayForecast(f))
  }

  return (
    <Card
      body
      className={dayForecast ? styles['day-forecast__block'] : styles['forecast-block']}
      onClick={() => dayForecast && dispatch(clearDayForecast())}
    >
      <Card.Title>
        <span>
        <h1>
          Погода {dayForecast ? dayForecast.day : 'на 5 дней'}
        </h1>
        </span>
      </Card.Title>
      <Row className={styles['forecast-row']}>
        {(dayForecast ? dayForecast.day_forecast : forecast).map((f, index: number) => {
          return (
            <Col 
              key={index}
              className={dayForecast ? styles['day-forecast__row-item'] : styles['forecast-row__item']}
              onClick={()=> chooseDayForecast(f as MainForecastItem)}
            > 
              <h4>{!dayForecast ? f.day : f.time }</h4>
              <div>
                { 
                  f?.icon ? 
                    <Image 
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