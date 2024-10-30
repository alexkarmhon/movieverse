import { useDispatch } from 'react-redux';

import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { moviesApi } from './moviesAPI';
import { rickandmortyAPI } from './rickandmorty';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [rickandmortyAPI.reducerPath]: rickandmortyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesApi.middleware,
      rickandmortyAPI.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch<AppDispatch>;
