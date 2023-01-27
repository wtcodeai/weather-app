interface City {
  value: string;
  data: CityData
}

interface CityData {
  city: string;
  geo_lat: number;
  geo_lon: number;
}

export interface CitiesResponse {
  suggestions: City[]
}