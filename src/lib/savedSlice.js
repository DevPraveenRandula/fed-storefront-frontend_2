import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: {
    items: [],
  },
  reducers: {
    toggleSaved: (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index >= 0) {
        state.items.splice(index, 1); // Remove if already saved
      } else {
        state.items.push(action.payload); // Add if not saved
      }
    },
  },
});

export const { toggleSaved } = savedSlice.actions;
export default savedSlice.reducer;
