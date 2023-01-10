import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectIataCodesIds } from "./selectors";
import { LoadingStatuses } from "../../constants/loadingStatuses";

export const fetchIataCodes = createAsyncThunk(
  "iataCodes/fetchIataCodes",
  async (_, thunkApi) => {
    const iataCodesIds = selectIataCodesIds(thunkApi.getState());

    if (iataCodesIds.length > 0) {
      return thunkApi.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const responce = await fetch("http://localhost:3001/api/iataCodes/");

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
