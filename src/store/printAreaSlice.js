import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bubblesList from "const/bubblesList";
import { setTextId } from "./textIdSlice";

const initialState = {
  printArea: JSON.parse(localStorage.getItem("printArea")) || {
    id: bubblesList[0].printAreas[0].id,
    name: bubblesList[0].printAreas[0].name,
  },
};

if (!localStorage.getItem("printArea")) {
  localStorage.setItem(
    "printArea",
    JSON.stringify({
      id: bubblesList[0].printAreas[0].id,
      name: bubblesList[0].printAreas[0].name,
    })
  );
}

const printAreaSlice = createSlice({
  name: "printArea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPrintArea.fulfilled, (state, action) => {
      const { printArea } = action.payload;
      state.printArea = printArea;
      localStorage.setItem("printArea", JSON.stringify(printArea));
    });
  },
});

export const setPrintArea = createAsyncThunk("printArea/setPrintArea", async (printArea, thunkAPI) => {
  const settings = thunkAPI.getState().settings.settings;
  const newTextId = settings.printAreas.find((b) => b.id === printArea.id).texts[0]?.id || null;

  thunkAPI.dispatch(setTextId(newTextId));

  return { printArea };
});

export default printAreaSlice.reducer;
