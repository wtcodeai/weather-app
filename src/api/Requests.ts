import { GeolocationSelectRequest } from "./GeolocationApi";
import { DADATA_API_KEY, DADATA_BASE_URL } from "../config/dadata";

import { WeatherRequest } from "./WeatherApi";
import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../config/weather"

class Requests {
  GeolocationSelectRequest = new GeolocationSelectRequest(DADATA_BASE_URL, DADATA_API_KEY);
  WeatherRequest = new WeatherRequest(WEATHER_BASE_URL, WEATHER_API_KEY);
}

export const requests = new Requests();