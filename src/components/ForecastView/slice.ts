import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { requests } from '../../api/Requests';
import { Coordinates } from '../../api/dto/CityCoordinates.dto';
import { ForecastSingle } from '../../api/dto/ForecastReponse.dto';

const DAY_FORECAST_TIME = 12

interface ForecastItem {
  day: string,
  icon: string;
  description: string;
  temp: number;
  feels_like: number
}

interface MainForecastItem extends ForecastItem {
  day_forecast: ForecastItem[]
}

export interface ForecastState {
  loading: boolean,
  forecast: ForecastItem[]
}

const initialState: ForecastState = {
  loading: false,
  forecast: []
};

const parseForecast = (data: ForecastSingle[]) => {
  const x = new Date()
  const curd = x.getUTCDate()
  const currentForecast = data.filter(d => {
    const date = new Date(d.dt*1000)
    const day = date.getUTCDate()
    return curd !== day
  })
  const dates = data.map(d => d.dt_txt.split(' ')[0])
  const udates = [...new Set(dates)]
  const result: any = []
  udates.forEach(dt => {
    let dayres = data.filter(fo => {
      return fo.dt_txt.startsWith(dt)
    })
    let founded = dayres.find(time => {
      const ft = +time.dt_txt.split(' ')[1].split(':')[0]
      return ft === DAY_FORECAST_TIME
    })
    if (!founded) founded = dayres[dayres.length-1]
    result.push(founded)
  })
  const parsedResult = result.map((val: ForecastSingle) => {
    const w = val.weather[0]
    var date = new Date(val.dt_txt)
    const options = { month: 'short', day: 'numeric' }
    //@ts-ignore
    const mo = new Intl.DateTimeFormat('ru-RU', options).format(date)
    const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date)
    let dayDesk = dayOfWeek + ', ' + mo
    const x = new Date()
    const curd = x.getUTCDate()
    const dat = new Date(val.dt*1000)
    const compd = date.getUTCDate()
    if (curd === compd) {
      dayDesk = 'Сегодня'
    }
    const toReturn = {
      day: dayDesk,
      icon: w.icon,
      description: w.description,
      temp: val.main.temp,
      feels_like: val.main.feels_like
    }
    return toReturn
  })
  console.log('RESULT', parsedResult)
  return parsedResult
}


export const getForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (coords: Coordinates) => {
    const response = await requests.WeatherRequest.getForecastByGeolocation(coords)
    return response
  }
);

export const selectForecast = (state: RootState) => state.forecast.forecast

export const forecastSlice = createSlice({
  name: 'geolocationSelect',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        console.log('FORECAST', action.payload)
        state.loading = false;
        const parsed = parseForecast(action.payload.list)
        state.forecast = parsed
      })
      .addCase(getForecast.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default forecastSlice.reducer;
