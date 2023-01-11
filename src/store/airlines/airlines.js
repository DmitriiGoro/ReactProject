import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { LoadingStatuses } from "../../constants/loadingStatuses";
import { AIRLINES_URL } from "../../urls/urls";
import {
  selectAirlinesDownloadLimit,
  selectAirlinesInitialDownloadLimit,
} from "./selectors";

export const fetchAirline = createAsyncThunk(
  "airlines/fetchAirline",
  async ({ airlineInput, step }, thunkApi) => {
    const url = AIRLINES_URL;

    const searchParams = new URLSearchParams(airlineInput);
    // think about this method (how to check previous data)
    url.searchParams.set(
      searchParams.get("query"),
      searchParams.get("airline")
    );

    let newLimit;

    if (!step) {
      const initialLimit = selectAirlinesInitialDownloadLimit(
        thunkApi.getState()
      );
      newLimit = initialLimit;
    } else if (step) {
      const currentLimit = selectAirlinesDownloadLimit(thunkApi.getState());
      newLimit = currentLimit + step;
    }

    url.searchParams.set("limit", newLimit);

    const responce = await fetch(url);

    const data = await responce.json();

    return { data, newLimit };
  }
);

const airlinesEntityAdapter = createEntityAdapter({
  selectId: (airline) => airline.id,
});

export const airlinesSlice = createSlice({
  name: "airlines",
  initialState: airlinesEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
    step: 20,
    initialLimit: 20,
    limit: 20,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchAirline.pending, (state) => {
        console.log(LoadingStatuses.inProgress);
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAirline.rejected, (state, { payload }) => {
        if (payload === LoadingStatuses.earlyAdded) {
          state.status = LoadingStatuses.success;
          return;
        }

        state.status = LoadingStatuses.failed;
      })
      .addCase(
        fetchAirline.fulfilled,
        (state, { payload: { data, newLimit } }) => {
          // if (newLimit === state.initialLimit) {
          state.entities = {};
          state.ids = [];
          state.limit = newLimit;
          airlinesEntityAdapter.addMany(state, data);
          state.status = LoadingStatuses.success;
          // } else {
          //   state.limit = newLimit;
          //   airlinesEntityAdapter.addMany(state, data);
          //   state.status = LoadingStatuses.success;
          // }
        }
      ),
});
