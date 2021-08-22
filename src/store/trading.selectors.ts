import {RootState} from './index';

export const selectTradingEnded = (state: RootState) =>
  state.trading.tradingEnded;
export const selectPrevTradingTime = (state: RootState) =>
  state.trading.prevTradingTime;
