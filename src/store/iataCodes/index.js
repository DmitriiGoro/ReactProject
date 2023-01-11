import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectIataCodesIds } from "./selectors";
import { LoadingStatuses } from "../../constants/loadingStatuses";
import { IATA_CODES_URL } from "../../urls/urls";

export const fetchIataCodes = createAsyncThunk(
  "iataCodes/fetchIataCodes",
  async (_, thunkApi) => {
    const iataCodesIds = selectIataCodesIds(thunkApi.getState());

    if (iataCodesIds.length > 0) {
      return thunkApi.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const url = IATA_CODES_URL;

    const responce = await fetch(url);

    return await responce.json();
  }
);

const initialStateAdapter = {
  entities: {},
  ids: [],
  status: LoadingStatuses.idle,
};

export const iataCodesSlice = createSlice({
  name: "iataCodes",
  initialState: initialStateAdapter,
  extraReducers: (builder) =>
    builder
      .addCase(fetchIataCodes.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchIataCodes.rejected, (state, { payload }) => {
        if (payload === LoadingStatuses.earlyAdded) {
          state.status = LoadingStatuses.success;
          return;
        }

        state.status = LoadingStatuses.failed;
      })
      .addCase(fetchIataCodes.fulfilled, (state, { payload }) => {
        state.entities = payload;
        state.ids = Object.keys(payload);
        state.status = LoadingStatuses.success;
      }),
});
