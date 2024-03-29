import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  token: string | null;
  name: string | null;
  email: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
  registerLoading: boolean;
  registerError: string | boolean;
  loginError: string | boolean;
  loginLoading: boolean;
}

interface UserPayload {
  token: string | null;
  name: string | null;
  email: string | null;
  _id: string | null;
}

const initialState: UserState = {
  token: null,
  name: null,
  email: null,
  userId: null,
  error: null,
  loading: false,
  loginError: false,
  loginLoading: false,
  registerError: false,
  registerLoading: false,
};

interface UserObj {
  email: string;
  password: string;
}

interface RegisterObj {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const registerUser = createAsyncThunk(
  "register",
  async (user: RegisterObj) => {
    const authResponse = await axios.post(
      `${process.env.REACT_APP_BE_BASE_URL}/api/users/register`,
      user
    );
    if (authResponse?.status === 201) {
      localStorage.setItem("user", JSON.stringify(authResponse?.data));
    }
    return authResponse?.data;
  }
);

export const getUserInfo = createAsyncThunk("getUser", async () => {
  const userInfo = await localStorage.getItem("user");
  let userObj: UserPayload = {
    token: null,
    name: null,
    email: null,
    _id: null,
  };
  if (userInfo !== null) {
    userObj = JSON.parse(userInfo);
  }
  return userObj;
});

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
  reducers: {
    resetErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload._id;
      state.registerError = false;
      state.registerLoading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.registerError = false;
      state.registerLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.registerError = "Existing credentials. Try again.";
      state.registerLoading = false;
    });
    builder.addCase(logInUser.pending, (state) => {
      state.loginError = false;
      state.loginLoading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload._id;
      state.loginError = false;
      state.loginLoading = false;
    });
    builder.addCase(logInUser.rejected, (state) => {
      state.loginError = "Wrong credentials. Try again.";
      state.loginLoading = false;
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
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload._id;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.error = "Error";
      state.loading = false;
    });
  },
});

export const { resetErrors } = UserSlice.actions;
export default UserSlice.reducer;
