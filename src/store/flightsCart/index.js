import { createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";

const initialState = createEntityAdapter({
  selectId: ({ flightNumber }) => flightNumber,
});

export const flightsCartSlice = createSlice({
  name: "flightsCart",
  initialState: initialState.getInitialState(),
  reducers: {
    addFlight: (state, { payload }) => {
      initialState.addOne(state, payload);
    },
    removeFlight: (state, { payload }) => {
      initialState.removeOne(state, payload);
    },
  },
});
