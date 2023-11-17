import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textId: JSON.parse(localStorage.getItem("textId")) || null,
};

if (!localStorage.getItem("textId")) {
  localStorage.setItem("textId", JSON.stringify(initialState.textId));
}

const textIdSlice = createSlice({
  name: "textId",
  initialState,
  reducers: {
    setTextId(state, action) {
      localStorage.setItem("textId", JSON.stringify(action.payload));
      state.textId = action.payload;
    },
  },
});

export const { setTextId } = textIdSlice.actions;

export default textIdSlice.reducer;
