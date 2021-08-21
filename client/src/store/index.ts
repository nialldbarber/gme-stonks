import {configureStore} from '@reduxjs/toolkit';
import configReducer from './config.slices';
import stonksReducer from './stonks.slices';
import tradingReducer from './trading.slices';

export const store = configureStore({
  reducer: {
    stonks: stonksReducer,
    trading: tradingReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
