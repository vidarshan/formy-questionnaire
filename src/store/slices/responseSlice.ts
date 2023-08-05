import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import { QuestionPayload } from "./questionnaireSlice";

interface ResponseState {
  paper: any | null;
  getLoading: boolean;
  getError: boolean;
  submitAnswerLoading: boolean;
  submitAnswerError: boolean;
}

interface AnswerPayload {
  questionnaireId: string;
  name: string;
  email: string;
  title: string;
  description: string;
  questions: QuestionPayload[];
}

const initialState: ResponseState = {
  paper: {
    _id: "",
    title: "",
    description: "",
    isLinkValid: false,
    isOneTime: false,
    isPublic: false,
    isPublished: false,
    questions: [],
    user: "",
    createdAt: "",
    updatedAt: "",
  },
  getLoading: false,
  getError: false,
  submitAnswerLoading: false,
  submitAnswerError: false,
};

export const getResponseQuestionnaire = createAsyncThunk(
  "get",
  async (id: string) => {
    const questionnaireResponse = await axios.get(
      `${process.env.REACT_APP_BE_BASE_URL}/api/response/${id}`,
      {}
    );
    return questionnaireResponse?.data;
  }
);

export const submitAnswer = createAsyncThunk(
  "submitAnswer",
  async (answerPayload: AnswerPayload) => {
    const questionnaire = await axios.put(
      `${process.env.REACT_APP_BE_BASE_URL}/api/response/submit`,
      answerPayload,
      {}
    );
    return questionnaire?.data;
  }
);

export const ResponseSlice = createSlice({
  name: "Response",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getResponseQuestionnaire.fulfilled, (state, action) => {
      state.paper = action.payload;
      state.getError = false;
      state.getLoading = false;
    });
    builder.addCase(getResponseQuestionnaire.pending, (state) => {
      state.getError = false;
      state.getLoading = true;
    });
    builder.addCase(getResponseQuestionnaire.rejected, (state, action) => {
      state.getError = true;
      state.getLoading = false;
    });
    builder.addCase(submitAnswer.fulfilled, (state) => {
      state.submitAnswerLoading = false;
      state.submitAnswerError = false;
    });
    builder.addCase(submitAnswer.pending, (state) => {
      state.submitAnswerLoading = true;
      state.submitAnswerError = false;
    });
    builder.addCase(submitAnswer.rejected, (state) => {
      state.submitAnswerLoading = false;
      state.submitAnswerError = true;
    });
  },
});

export const {} = ResponseSlice.actions;
export default ResponseSlice.reducer;
