import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import geolocationSelectReducer from '../components/GeolocationSelect/slice'
import mainSliceReducer from './slice'

export const store = configureStore({
  reducer: {
    main: mainSliceReducer,
    geolocation: geolocationSelectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
