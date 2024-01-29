import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  editorRoomId: string;
  collaboratorName: string;
}

const initialState: IInitialState = {
  editorRoomId: "",
  collaboratorName: "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorRoomId: (state, action) => {
      state.editorRoomId = action.payload;
    },

    setCollaboratorName: (state, action) => {
      state.collaboratorName = action.payload;
    },
  },
});

export const { setEditorRoomId, setCollaboratorName } = editorSlice.actions;

export default editorSlice.reducer;
