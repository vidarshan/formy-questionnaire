import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { UserSlice } from "./slices/authSlices";
import { QuestionnaireSlice } from "./slices/questionnaireSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    questionnaire: QuestionnaireSlice.reducer,
  },
  middleware: [thunkMiddleware],
});
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
