import { Coordinates } from "../api/dto/CityCoordinates.dto"

const finderOptions = {
  timeout: 3000
}

export const defineLocation = async () => {
  return new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords
        const { latitude, longitude } = coords
        resolve({ lat: latitude, lon: longitude })
      },
      (error) => {
        console.log(error)
        reject(error)
      },
      finderOptions
    )
  })
}