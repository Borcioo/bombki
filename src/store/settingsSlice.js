import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bubblesList from "const/bubblesList";
import { setTextId } from "./textIdSlice";

const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const newText = (id) => {
  return {
    id: id,
    size: 50,
    color: "#ff0000",
    font: "Open Sans",
    content: "test",
    position: { x: 512, y: 512 },
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    stroke: { color: "#ff0000", width: 0 },
  };
};

const initialState = {
  settings: JSON.parse(localStorage.getItem("appSettings")) || bubblesList[0],
};

if (!localStorage.getItem("appSettings")) {
  localStorage.setItem("appSettings", JSON.stringify(bubblesList[0]));
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action) {
      localStorage.setItem("appSettings", JSON.stringify(action.payload));
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTextArea.fulfilled, (state, action) => {
      localStorage.setItem("appSettings", JSON.stringify(action.payload));
      state.settings = action.payload;
    });
  },
});

export const setTextArea = createAsyncThunk("settings/setTextArea", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const settings = state.settings.settings;
  const printAreaId = state.printArea.printArea.id;
  const newId = generateUUID();
  const newTextArray = newText(newId);

  const printAreas = settings.printAreas.map((area) =>
    area.id === printAreaId ? { ...area, texts: area.texts.concat(newTextArray) } : area
  );

  const newSettings = {
    ...settings,
    printAreas,
  };

  thunkAPI.dispatch(setTextId(newId));

  return newSettings;
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
