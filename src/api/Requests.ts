import { GeolocationSelectRequest } from "./GeolocationApi";
import { DADATA_API_KEY, DADATA_BASE_URL } from "../config/dadata";

class Requests {
  GeolocationSelectRequest = new GeolocationSelectRequest(DADATA_BASE_URL, DADATA_API_KEY);
}

export const requests = new Requests();