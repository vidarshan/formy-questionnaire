import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../store";
import { notifications } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";

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
  allQuestionnaires: any[];
  published: number;
  unPublished: number;
  all: number;
  questionnaires: any[];
  keyword: string;
  pages: number;
  page: number;
  questionnaire: any | null;
  option: Option;
  options: Option[] | [];
  editableQuestion: any;
  editableQuestionnaire: QuestionnairePayload;
  getAllLoading: boolean;
  getAllError: boolean;
  getLoading: boolean;
  getError: boolean;
  editLoading: boolean;
  editError: boolean;
  participantMode: boolean;
  getStatsLoading: boolean;
  getStatsError: boolean;
  unpublishLoading: boolean;
  unpublishError: boolean;
  publishLoading: boolean;
  publishError: boolean;
}

interface Option {
  id: string;
  value: string;
  label: string;
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

export interface QuestionPayload {
  title: string;
  type: string | null;
  values: string | number | null;
  answers: string | null;
  options: any[];
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
  allQuestionnaires: [],
  published: 0,
  unPublished: 0,
  all: 0,
  questionnaires: [],
  keyword: "",
  pages: 1,
  page: 1,
  option: { id: uuidv4(), label: "", value: "" },
  options: [],
  editableQuestion: {
    title: "",
    type: "text",
    values: null,
    options: [],
    answers: "",
    response: "",
    required: false,
  },
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
  getStatsLoading: false,
  getStatsError: false,
  unpublishLoading: false,
  unpublishError: false,
  publishLoading: false,
  publishError: false,
};

interface QuestionnaireFetch {
  pageNumber: number;
  keyword: string;
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
  async (quesionnairesFetch: QuestionnaireFetch, { getState }) => {
    const state: RootState = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.user?.token}`,
      },
    };

    const authResponse = await axios.get(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire?keyword=${quesionnairesFetch.keyword}&pageNumber=${quesionnairesFetch.pageNumber}`,
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
    dispatch(getQuestionnaires({ keyword: "", pageNumber: 1 }));
    dispatch(getQuestionnaireStats());
    return authResponse?.data;
  }
);

export const editQuestionnaire = createAsyncThunk(
  "edit",
  async (editPayload: QuesionnaireEditPayload, { getState, dispatch }) => {
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
    dispatch(getQuestionnaire(editPayload.id));
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

export const unPublishQuestionnaire = createAsyncThunk(
  "unpublish",
  async (id: string, { getState, dispatch }) => {
    const state: RootState = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const questionnaire = await axios.put(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire/${id}/unpublish`,
      {},
      config
    );
    dispatch(getQuestionnaires({ keyword: "", pageNumber: 1 }));
    return questionnaire?.data;
  }
);

export const getQuestionnaireStats = createAsyncThunk(
  "getStats",
  async (_, { getState }) => {
    const state: RootState = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const questionnaireStats = await axios.get(
      `${process.env.REACT_APP_BE_BASE_URL}/api/quesionnaire/stats`,
      config
    );

    return questionnaireStats?.data;
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
    setQuestion(state, action: any) {
      state.editableQuestion[action.payload.property] = action.payload.value;
    },
    setOption(state, action) {
      state.option.id = action.payload.id;
      state.option.label = action.payload.label;
      state.option.value = action.payload.value;
    },
    setQuestionOptions(state) {
      state.options.push(state.option as never);
      state.editableQuestion.options.push(state.option);
    },
    resetQuestionOptions(state) {
      state.options = [];
    },
    setQuestionType(state, action) {
      state.editableQuestion.title = "";
      state.editableQuestion.type = action.payload;
      state.editableQuestion.values = null;
      state.editableQuestion.options = [];
      state.editableQuestion.answers = "";
      state.editableQuestion.response = "";
      state.editableQuestion.required = false;
    },
    resetQuestion(state) {
      state.editableQuestion.title = "";
      state.editableQuestion.type = "text";
      state.editableQuestion.values = null;
      state.editableQuestion.options = [];
      state.editableQuestion.answers = "";
      state.editableQuestion.response = "";
      state.editableQuestion.required = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createQuestionnaire.fulfilled, (state) => {
      notifications.show({
        title: "Questionnaire Created",
        message: "Proceed to add your content",
        radius: "xs",
      });
      state.createError = false;
      state.createLoading = false;
    });
    builder.addCase(createQuestionnaire.pending, (state) => {
      state.createError = false;
      state.createLoading = true;
    });
    builder.addCase(createQuestionnaire.rejected, (state, action) => {
      state.createError = true;
      state.createLoading = false;
    });
    builder.addCase(getQuestionnaires.fulfilled, (state, action) => {
      state.questionnaires = action.payload.questionnaires;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.keyword = action.payload.keyword;
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
      state.publishLoading = false;
      state.publishError = false;
    });
    builder.addCase(publishQuestionnaire.pending, (state) => {
      state.publishLoading = true;
      state.publishError = false;
    });
    builder.addCase(publishQuestionnaire.rejected, (state, action) => {
      state.publishLoading = false;
      state.publishError = true;
    });
    builder.addCase(getQuestionnaireStats.fulfilled, (state, action) => {
      state.all = action.payload.all;
      state.unPublished = action.payload.unPublished;
      state.published = action.payload.published;
      state.getStatsLoading = false;
      state.getStatsError = false;
    });
    builder.addCase(getQuestionnaireStats.pending, (state) => {
      state.getStatsLoading = true;
      state.getStatsError = false;
    });
    builder.addCase(getQuestionnaireStats.rejected, (state) => {
      state.getStatsLoading = false;
      state.getStatsError = true;
    });
    builder.addCase(unPublishQuestionnaire.fulfilled, (state, action) => {
      state.unpublishLoading = false;
      state.unpublishError = false;
    });
    builder.addCase(unPublishQuestionnaire.pending, (state) => {
      state.unpublishLoading = true;
      state.unpublishError = false;
    });
    builder.addCase(unPublishQuestionnaire.rejected, (state) => {
      state.unpublishLoading = false;
      state.unpublishError = true;
    });
  },
});

export const {
  switchView,
  answerQuestion,
  setQuestion,
  resetQuestion,
  setQuestionType,
  setQuestionOptions,
  setOption,
  resetQuestionOptions,
} = QuestionnaireSlice.actions;
export default QuestionnaireSlice.reducer;
