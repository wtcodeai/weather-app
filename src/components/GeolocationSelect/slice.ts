import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { requests } from '../../api/Requests';

interface GeolocationCity {
  name: string;
  lat: number;
  lon: number;
}

export interface GeolocationSelectState {
  cities: GeolocationCity[],
  loading: boolean,
  query: string
}

const initialState: GeolocationSelectState = {
  cities: [],
  loading: false,
  query: ''
};


export const setQuery = createAction<string>('geolocationSelect/setQuery')
export const getCities = createAsyncThunk(
  'geolocationSelect/fetchLocationData',
  async (query: string) => {
    const response = await requests.GeolocationSelectRequest.getCitiesArray(query)
    return response.suggestions
  }
);

export const selectCities = (state: RootState) => state.geolocation.cities
export const getQuery = (state: RootState) => state.geolocation.query

export const geolocationSelectSlice = createSlice({
  name: 'geolocationSelect',
  initialState,
  reducers: {
    clear: (state) => {
      state.cities = []
      state.query = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.loading = false;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = true;
        state.cities = action.payload.map(c => {
          return {
            name: c.data.city,
            lat: c.data.geo_lat,
            lon: c.data.geo_lon
          }
        });
      })
      .addCase(getCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setQuery, (state, action) => {
        state.query = action.payload
      })
  },
});

export const { clear } = geolocationSelectSlice.actions

export default geolocationSelectSlice.reducer;
