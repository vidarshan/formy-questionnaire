import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { UserSlice } from "./slices/authSlices";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
  middleware: [thunkMiddleware],
});
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
