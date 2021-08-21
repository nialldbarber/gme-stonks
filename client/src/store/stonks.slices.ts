import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface StonksState {
  price: number;
  priceGBP: number;
  prevPrice: number;
  priceTime: null | Date;
}

const initialState: StonksState = {
  price: -1,
  priceGBP: -1,
  prevPrice: -1,
  priceTime: null,
};

export const stonksSlice = createSlice({
  name: 'stonks',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setPriceGBP: (state, action: PayloadAction<number>) => {
      state.priceGBP = action.payload;
    },
    setPrevPrice: (state, action: PayloadAction<any>) => {
      state.prevPrice = action.payload;
    },
    setPriceTime: (state, action: PayloadAction<Date>) => {
      state.priceTime = action.payload;
    },
  },
});

export const {setPrice, setPriceGBP, setPrevPrice, setPriceTime} =
  stonksSlice.actions;

export default stonksSlice.reducer;
