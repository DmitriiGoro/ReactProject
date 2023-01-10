import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { LoadingStatuses } from "../../constants/loadingStatuses";
import { selectFlightByString } from "./selectors";
import { YNDX_API_URL } from "../../urls/urls";

export const fetchFlight = createAsyncThunk(
  "flights/fetchFlight",
  async ({ from, to, date, requestString }, thunkApi) => {
    const flight = selectFlightByString(thunkApi.getState(), { requestString });

    if (flight) {
      return thunkApi.rejectWithValue(LoadingStatuses.earlyAdded);
    }

    const url = new URL(YNDX_API_URL);
    url.searchParams.set("from", from.toLowerCase());
    url.searchParams.set("to", to.toLowerCase());
    url.searchParams.set("date", date);

    const responce = await fetch(url.href);
    const data = await responce.json();

    return { data, requestString };
  }
);

const flightsEntitiesAdapter = createEntityAdapter({
  selectId: ({ requestString }) => requestString,
});

export const flightsSlice = createSlice({
  name: "flights",
  initialState: flightsEntitiesAdapter.getInitialState({
    error: {},
    status: LoadingStatuses.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchFlight.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchFlight.rejected, (state, { payload }) => {
        if (payload === LoadingStatuses.earlyAdded) {
          state.status = LoadingStatuses.success;
          return;
        }

        state.status = LoadingStatuses.failed;
      })
      .addCase(fetchFlight.fulfilled, (state, { payload }) => {
        if (payload.data.error) {
          const { text, http_code } = payload.data.error;
          state.status = LoadingStatuses.failed;
          state.error = { text, http_code };
          return;
        }

        const {
          data: { segments },
          requestString,
        } = payload;

        flightsEntitiesAdapter.addOne(state, { requestString, segments });
        state.status = LoadingStatuses.success;
      }),
});
