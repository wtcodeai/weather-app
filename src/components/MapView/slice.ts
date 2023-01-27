import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { WEATHER_TILE_URL, WEATHER_TILE_FORMAT, WEATHER_API_KEY } from '../../config/weather'

export enum Layers {
  'clouds_new' = 'clouds_new',
  'precipitation_new' = 'precipitation_new',
  'pressure_new' = 'pressure_new',
  'wind_new' = 'wind_new',
  'temp_new' = 'temp_new'
}

interface MapInitialState {
  layer: Layers
}

const initialState: MapInitialState = {
  layer: Layers.temp_new
};


export const setLayer = createAction<Layers>('map/setLayer')

export const selectLayerUrl = (state: RootState) => {
  return `${WEATHER_TILE_URL}${state.map.layer}/{z}/{x}/{y}${ WEATHER_TILE_FORMAT}?appid=${WEATHER_API_KEY}`
}
export const selectCurrentLayer = (state: RootState) => state.map.layer

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLayer, (state, action) => {
        state.layer = action.payload
      })
  },
});


export default mapSlice.reducer;
