import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  token: string | null;
  name: string | null;
  email: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  token: null,
  name: null,
  email: null,
  userId: null,
  error: null,
  loading: false,
};

interface UserObj {
  email: string;
  password: string;
}

export const logInUser = createAsyncThunk("login", async (user: UserObj) => {
  const authResponse = await axios.post(
    `${process.env.REACT_APP_BE_BASE_URL}/api/users/login`,
    user
  );
  if (authResponse?.status === 200) {
    localStorage.setItem("user", JSON.stringify(authResponse?.data));
  }
  return authResponse?.data;
});

export const logOutUser = createAsyncThunk("logout", async () => {
  await localStorage.removeItem("user");
  return true;
});

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload._id;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(logInUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      console.log(action);
      state.error = "Wrong credentials. Try again.";
      state.loading = false;
    });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.token = null;
      state.name = null;
      state.email = null;
      state.userId = null;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(logOutUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(logOutUser.rejected, (state) => {
      state.error = "Error";
      state.loading = false;
    });
  },
});

export default UserSlice.reducer;
