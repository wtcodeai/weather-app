import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { defineLocation } from '../helpers/locationFinder';
import { requests } from '../api/Requests'

interface Geolocation {
  name: string;
  lat: number
  lon: number
}

interface MainState {
  geoloc: Geolocation;
}


const initialState: MainState = {
  geoloc: {
    name: 'Москва',
    lat: 55.751244,
    lon: 37.618423,
  }
};


export const setGeolocation = createAction<Geolocation>('currentGeolocation/setGeolocation')

export const defineGeolocation = createAsyncThunk(
  'currentGeolocation/defineCurrentGeolocation',
  async () => {
    const latLon = await defineLocation()

    const response = await requests.GeolocationSelectRequest.getCityByCoordinates({ 
      lat: latLon.lat,
      lon: latLon.lon
    })
    return response?.suggestions?.[0]
  }
);

export const getCurrentGeolocation = (state: RootState) => state.main.geoloc

export const mainSlice = createSlice({
  name: 'geolocationSelect',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(defineGeolocation.fulfilled, (state, action) => {
        state.geoloc.name = action.payload.data.city
        state.geoloc.lat = action.payload.data.geo_lat
        state.geoloc.lon = action.payload.data.geo_lon
      })
      .addCase(setGeolocation, (state, action) => {
        console.log('setted geoloc')
        state.geoloc = { ...state.geoloc, ...action.payload }
        console.log(state)
      })
  },
});

export default mainSlice.reducer;
