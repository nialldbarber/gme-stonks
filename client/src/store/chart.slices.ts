import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Data = {
  data: Array<any>;
};

export interface ChartState {
  series: Array<Data>;
}

const initialState: ChartState = {
  series: [
    {
      data: [],
    },
  ],
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setSeries: (state, action: PayloadAction<Array<Data>>) => {
      state.series = action.payload;
    },
  },
});

export const {setSeries} = chartSlice.actions;

export default chartSlice.reducer;
