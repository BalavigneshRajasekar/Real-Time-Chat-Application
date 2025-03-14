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
//Get Messages from server at Initial load
export const getMessages = createAsyncThunk(
  "get/Messages",
  async (receiverID, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/message/get/messages/${receiverID}`
      );
      console.log(response);
      return response.data.messages;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
//Get all messages and lastMessages and count
export const getAllMessages = createAsyncThunk(
  "get/allMessages",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/message/get/allMessages");
      console.log(response);
      return response.data.messages;
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
    lastMessages: {},
    allMessages: {},
    error: null,
    loading: false,
    messageLoading: false,
    messageError: null,
  },
  reducers: {
    setCurrentRecipient: (state, action) => {
      state.currentRecipient = action.payload;
    },
    setMessages: (state, action) => {
      console.log(action.payload);

      state.messages = [...state.messages, action.payload];
    },
    resetMessages: (state, action) => {
      state.messages = [];
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
      })
      // Get messages from Thunk and validate them
      .addCase(getMessages.pending, (state) => {
        state.messageLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messageLoading = false;

        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messageLoading = false;
        state.messageError = action.error.message;
      })
      // Get all messages and lastMessages and count
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((data) => {
          state.allMessages[data._id] = data.messages;
          state.lastMessages[data._id] = data.lastMessage;
        });
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setCurrentRecipient, setMessages, resetMessages } =
  asyncCalls.actions;
export default asyncCalls.reducer;
