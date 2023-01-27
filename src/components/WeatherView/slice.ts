import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { requests } from '../../api/Requests';
import { Coordinates } from '../../api/dto/CityCoordinates.dto';

interface Weather {
  icon: string;
  description: string;
  temp: number;
  feels_like: number
}

export interface WeatherState {
  loading: boolean,
  weather: Weather
}

const initialState: WeatherState = {
  loading: false,
  weather: {
    icon: '',
    description: '',
    temp: 0,
    feels_like: 0
  }
};


export const getWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (coords: Coordinates) => {
    const response = await requests.WeatherRequest.getWeatherByGeolocation(coords)
    return response
  }
);

export const selectWeather = (state: RootState) => state.weather.weather

export const weatherSlice = createSlice({
  name: 'geolocationSelect',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        const locWeather = action.payload.weather[0]
        const mainWeather = action.payload.main
        const w = {
          icon: locWeather.icon,
          description: locWeather.description,
          temp: mainWeather.temp,
          feels_like: mainWeather.feels_like
        }
        state.weather = { ...state.weather, ...w }
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default weatherSlice.reducer;
