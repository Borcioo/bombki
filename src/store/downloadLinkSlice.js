import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  downloadLink: "",
};

const downloadLinkSlice = createSlice({
  name: "downloadLink",
  initialState,
  reducers: {
    setDownloadLink(state, action) {
      state.downloadLink = action.payload;
    },
  },
});

export const { setDownloadLink } = downloadLinkSlice.actions;

export default downloadLinkSlice.reducer;
