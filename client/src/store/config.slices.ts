import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ConfigState {
  currency: string;
  loading: boolean;
  error: boolean;
}

const initialState: ConfigState = {
  currency: 'USD',
  loading: true,
  error: false,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const {setCurrency, setLoading, setError} = configSlice.actions;

export default configSlice.reducer;
