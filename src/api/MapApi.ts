import { BaseRequest } from "./BaseRequest";
import { WeatherResponse } from "./dto/WeatherResponse.dto";
import { Coordinates } from "./dto/CityCoordinates.dto";

export class MapRequest extends BaseRequest {
  protected apiKey: string = ''

  constructor(baseurl: string, apikey: string) {
    super(baseurl);
    this.apiKey = apikey;
  }

  getWeatherByGeolocation(coords: Coordinates, config?: Record<string, unknown>): Promise<WeatherResponse>  {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Token " + this.apiKey
    };

    return this.fetch(`/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${this.apiKey}&units=metric&lang=ru`, {
      method: "GET",
      headers,
      ...config
    })
      .then((response: Response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
