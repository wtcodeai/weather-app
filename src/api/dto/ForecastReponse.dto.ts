import { WeatherSingle } from './WeatherResponse.dto'

export interface ForecastResponse {
  list: ForecastSingle[]
}

export interface ForecastSingle {
  dt: number,
  dt_txt: string;
  weather: WeatherSingle[]
  main: {
    temp: number,
    feels_like: number,
  }
}
