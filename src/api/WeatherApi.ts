import { BaseRequest } from "./BaseRequest";
import { WeatherResponse } from "./dto/WeatherResponse.dto";
import { ForecastResponse } from "./dto/ForecastReponse.dto";
import { Coordinates } from "./dto/CityCoordinates.dto";

export class WeatherRequest extends BaseRequest {
  protected apiKey: string = ''

  constructor(baseurl: string, apikey: string) {
    super(baseurl);
    this.apiKey = apikey;
  }

  getWeatherByGeolocation(coords: Coordinates, config?: Record<string, unknown>): Promise<WeatherResponse>  {
    const headers = {
      Accept: "text/html,application/xhtml+xml,application/xml"
    };

    return this.fetch(`/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=metric&lang=ru`, {
      method: "GET",
      headers,
      ...config
    })
      .then((response: Response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getForecastByGeolocation(coords: Coordinates, config?: Record<string, unknown>): Promise<ForecastResponse>  {
    const headers = {
      Accept: "text/html,application/xhtml+xml,application/xml"
    };

    return this.fetch(`/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=metric&lang=ru`, {
      method: "GET",
      headers,
      ...config
    })
      .then((response: Response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
