import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { logger } from "./middlewares/logger";
import { flightsSlice } from "./flights";
import { flightsInputSlice } from "./flightsInput";
import { flightsCartSlice } from "./flightsCart";
import { iataCodesSlice } from "./iataCodes";
import { airlinesSlice } from "./airlines/airlines";

export const rootReducer = combineReducers({
  flights: flightsSlice.reducer,
  flightsInput: flightsInputSlice.reducer,
  flightsCart: flightsCartSlice.reducer,
  iataCodes: iataCodesSlice.reducer,
  airlines: airlinesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
