import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
}

interface QuestionnairePayload {
  title: string;
  description: string;
  isPublic: boolean;
  isOneTime: boolean;
  questions: any[];
}

const initialState: QuestionnaireState = {
  title: "",
  description: "",
  isPublic: false,
  questions: [],
  user: null,
  isPublished: true,
  isLinkValid: false,
  isOneTime: false,
  createLoading: false,
  createError: false,
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

export const createQuestionnaire = createAsyncThunk(
  "create",
  async (questionnaire: QuestionnairePayload, { getState }) => {
    console.log(
      "🚀 ~ file: questionnaireSlice.ts:54 ~ questionnaire:",
      questionnaire
    );
    const state: RootState = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const authResponse = await axios.post(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire`,
      questionnaire,
      config
    );

    return authResponse?.data;
  }
);

export const QuestionnaireSlice = createSlice({
  name: "Questionnaire",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestionnaire.fulfilled, (state, action) => {
      state.createError = false;
      state.createLoading = false;
    });
    builder.addCase(createQuestionnaire.pending, (state) => {
      notifications.show({
        title: "You've been compromised",
        message: "Leave the building immediately",
      });
      state.createError = false;
      state.createLoading = true;
    });
    builder.addCase(createQuestionnaire.rejected, (state, action) => {
      console.log(action);
      state.createError = true;
      state.createLoading = false;
    });
  },
});

export default QuestionnaireSlice.reducer;
