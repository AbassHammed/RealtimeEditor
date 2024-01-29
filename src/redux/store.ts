import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./editorSlice";

export const store = configureStore({
  reducer: {
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
