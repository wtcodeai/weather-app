export interface WeatherResponse {
  weather: WeatherSingle[]
  main: {
    temp: number,
    feels_like: number,
  }
}

export interface WeatherSingle {
  main: string,
  description: string,
  icon: string
}