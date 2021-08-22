import {configureStore} from '@reduxjs/toolkit';
import throttle from 'lodash.throttle';
import {
  saveStateToLocalStorage,
  loadStateFromLocalStorage,
} from './config.middleware';
import configReducer from './config.slices';
import stonksReducer from './stonks.slices';
import tradingReducer from './trading.slices';

export const store = configureStore({
  reducer: {
    stonks: stonksReducer,
    trading: tradingReducer,
    config: configReducer,
  },
  // preloadedState: loadStateFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// store.subscribe(
//   throttle(() => saveStateToLocalStorage(store.getState()), 1000)
// );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
