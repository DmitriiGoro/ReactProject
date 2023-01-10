export const selectFlightsCartModule = (state) => state.flightsCart;

export const selectFlightsCartModuleEntities = (state) =>
  selectFlightsCartModule(state).entities;

export const selectFlightsCartModuleIds = (state) =>
  selectFlightsCartModule(state).ids;

export const selectFlightFromCartByString = (state, { flightString }) =>
  selectFlightsCartModuleEntities(state)[flightString];
