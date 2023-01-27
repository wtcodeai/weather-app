import { Coordinates } from "../api/dto/CityCoordinates.dto"

const finderOptions = {
  timeout: 1000
}

export const defineLocation = async () => {
  return new Promise<Coordinates>((resolve, reject) => {
    console.log('DEF LOC')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('FOUNDED POS', position)
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