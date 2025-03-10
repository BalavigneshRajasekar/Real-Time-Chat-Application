/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/axiosConfig";

//Get Receiver details when app loads to show user to message
export const getUserData = createAsyncThunk(
  "get/ReceiverData",
  async (Id, thunkAPI) => {
    try {
      const response = await axiosInstance("/app/get/allUsers");
      console.log(response);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const asyncCalls = createSlice({
  name: "asyncCalls",
  initialState: {
    receiverData: [],
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
        state.receiverData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default asyncCalls.reducer;
