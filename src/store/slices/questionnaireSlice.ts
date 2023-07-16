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
  questionnaires: any[];
  questionnaire: any | null;
  editableQuestionnaire: QuestionnairePayload;
  getAllLoading: boolean;
  getAllError: boolean;
  getLoading: boolean;
  getError: boolean;
  editLoading: boolean;
  editError: boolean;
  participantMode: boolean;
}

interface QuestionnairePayload {
  _id: string;
  title: string;
  description: string;
  isLinkValid: boolean;
  isOneTime: boolean;
  isPublic: boolean;
  isPublished: boolean;
  questions: any[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateQuestionnairePayload {
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

interface QuesionnaireEditPayload {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  isPublished: boolean;
  isOneTime: boolean;
  question: QuestionPayload[] | null;
}

const initialState: QuestionnaireState = {
  title: "",
  description: "",
  isPublic: false,
  questions: [],
  user: null,
  isPublished: false,
  isLinkValid: false,
  isOneTime: false,
  createLoading: false,
  createError: false,
  questionnaires: [],
  editableQuestionnaire: {
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
  questionnaire: {
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
  getAllLoading: false,
  getAllError: false,
  getLoading: false,
  getError: false,
  editLoading: false,
  editError: false,
  participantMode: true,
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

export const getQuestionnaire = createAsyncThunk(
  "get",
  async (id: string, { getState }) => {
    const state: RootState = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
    };

    const questionnaireResponse = await axios.get(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire/${id}`,
      config
    );
    return questionnaireResponse?.data;
  }
);

export const getQuestionnaires = createAsyncThunk(
  "getAll",
  async (_, { getState }) => {
    const state: RootState = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
    };

    const authResponse = await axios.get(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire`,
      config
    );
    return authResponse?.data;
  }
);

export const createQuestionnaire = createAsyncThunk(
  "create",
  async (questionnaire: CreateQuestionnairePayload, { getState, dispatch }) => {
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
    dispatch(getQuestionnaires());
    return authResponse?.data;
  }
);

export const editQuestionnaire = createAsyncThunk(
  "edit",
  async (editPayload: QuesionnaireEditPayload, { getState }) => {
    const state: RootState = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const questionObj = {
      title: editPayload.title,
      description: editPayload.description,
      isPublic: editPayload.isPublic,
      isPublished: editPayload.isPublished,
      isLinkValid: false,
      questions: editPayload.question,
    };

    const questionnaire = await axios.put(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire/${editPayload.id}`,
      questionObj,
      config
    );

    return questionnaire?.data;
  }
);

export const publishQuestionnaire = createAsyncThunk(
  "publish",
  async (id: string, { getState }) => {
    const state: RootState = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const questionnaire = await axios.put(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire/${id}/publish`,
      {},
      config
    );
    return questionnaire?.data;
  }
);

export const QuestionnaireSlice = createSlice({
  name: "Questionnaire",
  initialState,
  reducers: {
    switchView(state, action) {
      state.participantMode = action.payload;
    },
    answerQuestion(state, action: any) {
      state.editableQuestionnaire.questions[action.payload.index].values =
        action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createQuestionnaire.fulfilled, (state, action) => {
      state.createError = false;
      state.createLoading = false;
    });
    builder.addCase(createQuestionnaire.pending, (state) => {
      notifications.show({
        title: "Questionnaire Created",
        message: "Proceed to add your content",
        radius: "xs",
      });
      state.createError = false;
      state.createLoading = true;
    });
    builder.addCase(createQuestionnaire.rejected, (state, action) => {
      state.createError = true;
      state.createLoading = false;
    });
    builder.addCase(getQuestionnaires.fulfilled, (state, action) => {
      state.questionnaires = action.payload;
      state.getAllError = false;
      state.getAllLoading = false;
    });
    builder.addCase(getQuestionnaires.pending, (state) => {
      state.getAllError = false;
      state.getAllLoading = true;
    });
    builder.addCase(getQuestionnaires.rejected, (state, action) => {
      state.getAllError = true;
      state.getAllLoading = false;
    });
    builder.addCase(getQuestionnaire.fulfilled, (state, action) => {
      state.questionnaire = action.payload;
      state.editableQuestionnaire = action.payload;
      state.getError = false;
      state.getLoading = false;
    });
    builder.addCase(getQuestionnaire.pending, (state) => {
      state.getError = false;
      state.getLoading = true;
    });
    builder.addCase(getQuestionnaire.rejected, (state, action) => {
      state.getError = true;
      state.getLoading = false;
    });
    builder.addCase(publishQuestionnaire.fulfilled, (state, action) => {
      state.questionnaire = action.payload;
      state.editError = false;
      state.editLoading = false;
    });
    builder.addCase(publishQuestionnaire.pending, (state) => {
      state.editError = false;
      state.editLoading = true;
    });
    builder.addCase(publishQuestionnaire.rejected, (state, action) => {
      state.editError = true;
      state.editLoading = false;
    });
  },
});

export const { switchView, answerQuestion } = QuestionnaireSlice.actions;
export default QuestionnaireSlice.reducer;
