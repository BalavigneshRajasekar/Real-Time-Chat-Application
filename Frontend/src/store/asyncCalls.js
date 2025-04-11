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
    lastMessages: {}, //last message of each recipient sended to sender
    allMessages: {}, // all messages between current sender and current receiver
    logoutModal: false,
    profileModal: false,
    error: null,
    loading: false,
    messageLoading: false,
    messageError: null,
  },
  reducers: {
    setCurrentRecipient: (state, action) => {
      state.currentRecipient = action.payload;
    },

    //Set new messages Handle here
    setMessages: (state, action) => {
      console.log("receiver change message");

      //Destructure the payload Data
      const { newMessage, userId } = action.payload;
      console.log(action.payload);

      const { receiverID, senderID } = newMessage;

      //Check whether user ID and receiver ID are same
      let confirmReceiver = userId == receiverID ? senderID : receiverID;

      //Check if the users text the recipient for first time
      if (!state.allMessages[confirmReceiver]) {
        state.allMessages[confirmReceiver] = [];
      }
      //Add new message to the array of messages for respective user
      state.allMessages[confirmReceiver] = [
        ...state.allMessages[confirmReceiver],
        newMessage,
      ];

      //  set Last message with update one
      state.lastMessages[confirmReceiver] = newMessage;
    },

    //Handle message seen status updates here
    setMessageSeen: (state, action) => {
      //TODO set message seen logic whenever We get received message
      const { receiverID, senderID } = action.payload;
      console.log(action.payload);

      // update seen as true when ever this method dispatched
      if (state.allMessages[receiverID]) {
        console.log("hello from seen change");

        // Create a new array reference (ensuring immutability)
        state.allMessages[receiverID] = state.allMessages[receiverID].map(
          (message) =>
            message.senderID === senderID ? { ...message, read: true } : message
        );
      }
    },

    resetMessages: (state, action) => {
      state.messages = [];
    },
    setLogoutModal: (state, action) => {
      state.logoutModal = !state.logoutModal;
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload
        ? action.payload
        : !state.profileModal;
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

      // Get all messages and lastMessages and count
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        //Get Array of data which contains the recipient id and messages array
        //We extract and set to allMessages state like key value pair {87656342534455:[message]}
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
export const {
  setCurrentRecipient,
  setMessages,
  resetMessages,
  setMessageSeen,
  setLogoutModal,
  setProfileModal,
} = asyncCalls.actions;
export default asyncCalls.reducer;
