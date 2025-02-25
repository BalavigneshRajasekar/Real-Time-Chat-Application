/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Create Async handle Functions
export const getUserData = createAsyncThunk(
  "get/UserData",
  async (Id, thunkAPI) => {
    try {
      console.log(Id);

      const response = await fetch("https://dummyjson.com/users");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const asyncCalls = createSlice({
  name: "asyncCalls",
  initialState: {
    data: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default asyncCalls.reducer;
