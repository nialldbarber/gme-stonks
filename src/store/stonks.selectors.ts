import {RootState} from './index';

export const selectPrice = (state: RootState) => state.stonks.price;
export const selectPriceGBP = (state: RootState) => state.stonks.priceGBP;
export const selectPrevPrice = (state: RootState) => state.stonks.prevPrice;
export const selectPriceTime = (state: RootState) => state.stonks.priceTime;
