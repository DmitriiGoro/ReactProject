import { createSelector } from "@reduxjs/toolkit";

export const selectIataCodesModule = (state) => state.iataCodes;

export const selectIataCodesEntities = (state) =>
  selectIataCodesModule(state).entities;

export const selectIataCodesIds = (state) => selectIataCodesModule(state).ids;

export const selectCityNameByIataCode = (state, { iataCode }) =>
  Object.entries(selectIataCodesEntities(state))?.find(
    ([city, code]) => code === iataCode
  )?.[0];

export const selectFilteredIataCodes = () =>
  createSelector(
    [selectIataCodesEntities, (_, { inputValue }) => inputValue],
    (entities, inputValue) => {
      if (inputValue?.length > 1) {
        const result = [];

        for (const cityAndCode of Object.entries(entities)) {
          const [city] = cityAndCode;

          if (city.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
            result.push(cityAndCode);
          }
          if (result.length > 8) {
            break;
          }
        }

        return result;
      }
    },
    []
  );
