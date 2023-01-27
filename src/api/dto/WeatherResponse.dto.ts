export interface WeatherResponse {
  weather: WeatherSingle[]
  main: {
    temp: 8.48,
    feels_like: 4.9,
  }
}

interface WeatherSingle {
  main: string,
  description: string,
  icon: string
}