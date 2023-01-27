import { BaseRequest } from "./BaseRequest";
import { CitiesResponse } from "./dto/GeolocationCitiesResponse.dto";
import { Coordinates } from "./dto/CityCoordinates.dto";

export class GeolocationSelectRequest extends BaseRequest {
  protected apiKey: string = ''

  constructor(baseurl: string, apikey: string) {
    super(baseurl);
    this.apiKey = apikey;
  }

  getCitiesArray(query: string, config?: Record<string, unknown>): Promise<CitiesResponse>  {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Token " + this.apiKey
    };

    const body = JSON.stringify({ 
      query,
      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
      count: 5
    })

    return this.fetch(`/rs/suggest/address`, {
      method: "POST",
      headers,
      body,
      ...config
    })
      .then((response: Response) => response.json())
      .catch(BaseRequest.handleError);
  }

  getCityByCoordinates(coords: Coordinates, config?: Record<string, unknown>): Promise<CitiesResponse> {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Token " + this.apiKey
    };

    const body = JSON.stringify({ 
      lat: coords.lat, 
      lon: coords.lon,
      count: 1
    })

    return this.fetch(`/rs/geolocate/address`, {
      method: "POST",
      headers,
      body,
      ...config
    })
      .then((response: Response) => response.json())
      .catch(BaseRequest.handleError);
  
  }
}
