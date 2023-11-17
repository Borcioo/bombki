import { createSlice } from "@reduxjs/toolkit";

const texturesImagesSlice = createSlice({
  name: "texturesImages",
  initialState: {
    texturesImages: [],
  },
  reducers: {
    setTexturesImages: (state, action) => {
      state.texturesImages = action.payload;
    },
  },
});

export const { setTexturesImages } = texturesImagesSlice.actions;

export default texturesImagesSlice.reducer;
