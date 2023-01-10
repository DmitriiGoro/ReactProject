export const selectFlightModule = (state) => state.flights;

export const selectFlightEntities = (state) =>
  selectFlightModule(state).entities;

export const selectFlightByString = (state, { requestString }) =>
  selectFlightEntities(state)[requestString];

export const selectFlightsError = (state) => selectFlightModule(state).error;

export const selectFlightsStatus = (state) => selectFlightModule(state).status;

export const selectFlightsLastRequest = (state) =>
  selectFlightModule(state).lastRequest;
