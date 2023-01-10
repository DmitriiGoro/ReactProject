export const selectFlightsInputModule = (state) => state.flightsInput;

export const selectFlightsInputDate = (state) => state.flightsInput.date;

export const selectFlightsInputByName = (state, { inputName }) =>
  state.flightsInput[inputName];
