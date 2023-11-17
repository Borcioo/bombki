import { createSlice } from "@reduxjs/toolkit";

const objSlice = createSlice({
  name: "obj",
  initialState: {
    obj: null,
  },
  reducers: {
    setObj: (state, action) => {
      state.obj = action.payload;
    },
  },
});

export const { setObj } = objSlice.actions;

export default objSlice.reducer;
