import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../store";
import { notifications } from "@mantine/notifications";

interface QuestionnaireState {
  title: string;
  description: string;
  isPublic: boolean;
  questions: any[];
  user: any | null;
  isPublished: boolean;
  isLinkValid: boolean;
  isOneTime: boolean;
  createLoading: boolean;
  createError: boolean;
  questionnaires: any[];
  questionnaire: any | null;
  getLoading: boolean;
  getError: boolean;
}

interface QuestionnairePayload {
  title: string;
  description: string;
  isPublic: boolean;
  isOneTime: boolean;
  questions: any[];
}

interface QuestionPayload {
  title: string;
  type: string | null;
  values: string | number | null;
  answers: string | null;
  response: string | null;
  required: boolean;
}

interface InterfaceState {
  addQuestionOpen: boolean;
}

const initialState: InterfaceState = {
  addQuestionOpen: false,
};

export const InterfaceSlice = createSlice({
  name: "Interface",
  initialState,
  reducers: {
    setAddQuestionOpen(state, action: PayloadAction<boolean>) {
      state.addQuestionOpen = action.payload;
    },
  },
});

export const { setAddQuestionOpen } = InterfaceSlice.actions;
export default InterfaceSlice.reducer;
