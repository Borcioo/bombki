import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import printAreaReducer from "./printAreaSlice";
import bubbleReducer from "./bubbleSlice";
import textIdReducer from "./textIdSlice";
import downloadLinkReducer from "./downloadLinkSlice";
import objReducer from "./objSlice";
import texturesImagesReducer from "./texturesImagesSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    printArea: printAreaReducer,
    bubble: bubbleReducer,
    textId: textIdReducer,
    downloadLink: downloadLinkReducer,
    obj: objReducer,
    texturesImages: texturesImagesReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
