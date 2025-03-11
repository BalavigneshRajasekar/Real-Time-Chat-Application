/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/axiosConfig";

//Get Receiver details when app loads to show user to message
export const getUserData = createAsyncThunk(
  "get/ReceiverData",
  async (thunkAPI) => {
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
    receiverData: [], // All users except self
    currentRecipient: null, // current message recipient
    messages: [], // all messages between current sender and current receiver
    error: null,
    loading: false,
  },
  reducers: {
    setCurrentRecipient: (state, action) => {
      state.currentRecipient = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
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
export const { setCurrentRecipient, setMessages } = asyncCalls.actions;
export default asyncCalls.reducer;
