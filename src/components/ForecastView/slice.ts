import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { requests } from '../../api/Requests';
import { Coordinates } from '../../api/dto/CityCoordinates.dto';
import { ForecastSingle } from '../../api/dto/ForecastReponse.dto';

const DAY_FORECAST_TIME = 12

interface ForecastItem {
  day: string,
  time: string;
  icon: string;
  description: string;
  temp: number;
  feels_like: number
}

export interface MainForecastItem extends ForecastItem {
  day_forecast: ForecastItem[]
}

export interface ForecastState {
  loading: boolean,
  forecast: MainForecastItem[],
  selected_for_day_forecast: MainForecastItem | null
}

interface ChildrenForecasts {
  children: ForecastSingle[];
} 

const initialState: ForecastState = {
  loading: false,
  forecast: [],
  selected_for_day_forecast: null
};

const parseForecastItem = (val: ForecastSingle): ForecastItem => {
  const w = val.weather[0]
  const date = new Date(val.dt_txt)
  const options = { month: 'short', day: 'numeric' }
  //@ts-ignore
  const mo = new Intl.DateTimeFormat('ru-RU', options).format(date)
  const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date)
  let dayDesk = dayOfWeek + ', ' + mo
  const x = new Date()
  const curd = x.getUTCDate()
  const compd = date.getUTCDate()
  const [t1, t2] = val.dt_txt.split(' ')[1].split(':')

  if (curd === compd) {
    dayDesk = 'Сегодня'
  }
  const toReturn = {
    day: dayDesk,
    icon: w.icon,
    time: `${t1}:${t2}`,
    description: w.description,
    temp: val.main.temp,
    feels_like: val.main.feels_like,
  }
  return toReturn
}

const parseForecast = (data: ForecastSingle[]) => {
  const dates = data.map(d => d.dt_txt.split(' ')[0])
  const udates = [...new Set(dates)]
  const result: Array<ForecastSingle & ChildrenForecasts> = []
  udates.forEach(dt => {
    let dayres = data.filter(fo => {
      return fo.dt_txt.startsWith(dt)
    })
    const comp = (t: ForecastSingle) => {
      const ft = +t.dt_txt.split(' ')[1].split(':')[0]
      return ft === DAY_FORECAST_TIME
    }
    let founded = dayres.find(time => comp(time))
    let other = dayres.filter(time => !comp(time))
    if (!founded) founded = dayres[dayres.length-1]
    const mainForecast = { ...founded, children: other }
    result.push(mainForecast)
  })
  const parsedResult = result.map((val) => {
    const { children, ...data} = val
    const fci: MainForecastItem = { 
      ...parseForecastItem(data), 
      day_forecast: children.map(d => parseForecastItem(d)) 
    }
    return fci
  })
  console.log('RESULT', parsedResult)
  return parsedResult
}


export const setDayForecast = createAction<MainForecastItem>('forecast/setDayForecast')
export const getForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (coords: Coordinates) => {
    const response = await requests.WeatherRequest.getForecastByGeolocation(coords)
    return response
  }
);

export const selectForecast = (state: RootState) => state.forecast.forecast
export const selectDayForecast = (state: RootState) => state.forecast.selected_for_day_forecast

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    clearDayForecast: (state) => {
      state.selected_for_day_forecast = null
    }
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
      .addCase(setDayForecast, (state, action) => {
        state.selected_for_day_forecast = action.payload
      })
  },
});

export const { clearDayForecast } = forecastSlice.actions

export default forecastSlice.reducer;
