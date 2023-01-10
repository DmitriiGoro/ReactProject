export const selectAirlinesModule = (state) => state.airlines;

export const selectAirlinesEntities = (state) =>
  selectAirlinesModule(state).entities;

export const selectAirlinesIds = (state) => selectAirlinesModule(state).ids;

export const selectAirlinesEntityById = (state, { airlineId }) =>
  selectAirlinesEntities(state)[airlineId];

export const selectAirlinesDownloadLimit = (state) =>
  selectAirlinesModule(state).limit;

export const selectAirlinesInitialDownloadLimit = (state) =>
  selectAirlinesModule(state).initialLimit;

export const selectAirlinesDownloadStep = (state) =>
  selectAirlinesModule(state).step;

export const selectAirlinesLoadingStatus = (state) =>
  selectAirlinesModule(state).status;
