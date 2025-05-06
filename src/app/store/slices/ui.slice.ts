import { createSlice } from "@reduxjs/toolkit";

interface IUISlice {
  language: string;
}

const initialState: IUISlice = {
  language: "uz",
};

const uiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default uiSlice.reducer;

export const { setLanguage } = uiSlice.actions;
