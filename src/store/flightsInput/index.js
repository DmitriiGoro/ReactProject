import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  from: "",
  to: "",
  date: "",
};

export const flightsInputSlice = createSlice({
  name: "flightsInput",
  initialState,
  reducers: {
    changeInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    changeDate: (state, { payload }) => {
      const { year, month, day } = payload;
      state.date = `${year}-${month + 1}-${day}`;
      console.log(state.date);
    },
  },
});
