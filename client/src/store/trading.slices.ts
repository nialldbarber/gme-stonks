import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TradingState {
  prevTradingTime: null | Date;
  tradingEnded: boolean;
}

const initialState: TradingState = {
  prevTradingTime: null,
  tradingEnded: false,
};

export const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setPrevTradingTime: (state, action: PayloadAction<Date>) => {
      state.prevTradingTime = action.payload;
    },
    setTradingEnded: (state, action: PayloadAction<boolean>) => {
      state.tradingEnded = action.payload;
    },
  },
});

export const {setPrevTradingTime, setTradingEnded} = tradingSlice.actions;

export default tradingSlice.reducer;
