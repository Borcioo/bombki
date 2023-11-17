import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bubblesList from "const/bubblesList";
import { setPrintArea } from "./printAreaSlice";

const initialState = {
  bubble: JSON.parse(localStorage.getItem("bubble")) || {
    id: bubblesList[0].id,
    name: bubblesList[0].name,
  },
};

if (!localStorage.getItem("bubble")) {
  localStorage.setItem(
    "bubble",
    JSON.stringify({
      id: bubblesList[0].id,
      name: bubblesList[0].name,
    })
  );
}

const bubbleSlice = createSlice({
  name: "bubble",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setBubble.fulfilled, (state, action) => {
      const { bubble } = action.payload;
      state.bubble = bubble;
      localStorage.setItem("bubble", JSON.stringify(bubble));
    });
  },
});

export const setBubble = createAsyncThunk("bubble/setBubble", async (bubble, thunkAPI) => {
  const newPrintArea = bubblesList.find((b) => b.id === bubble.id);
  thunkAPI.dispatch(setPrintArea({ id: newPrintArea.printAreas[0].id, name: newPrintArea.printAreas[0].name }));
  return { bubble };
});

export default bubbleSlice.reducer;
