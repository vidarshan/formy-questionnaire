import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InterfaceState {
  addQuestionOpen: boolean;
  addAnswerOpen: boolean;
}

const initialState: InterfaceState = {
  addQuestionOpen: false,
  addAnswerOpen: false,
};

export const InterfaceSlice = createSlice({
  name: "Interface",
  initialState,
  reducers: {
    setAddQuestionOpen(state, action: PayloadAction<any>) {
      state.addQuestionOpen = action.payload;
    },
    setAddAnswerOpen(state, action: PayloadAction<any>) {
      state.addAnswerOpen = action.payload;
    },
  },
});

export const { setAddQuestionOpen, setAddAnswerOpen } = InterfaceSlice.actions;
export default InterfaceSlice.reducer;
