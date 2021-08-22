import {RootState} from './index';

export const selectCurrency = (state: RootState) => state.config.currency;
export const selectLoading = (state: RootState) => state.config.loading;
export const selectError = (state: RootState) => state.config.error;
