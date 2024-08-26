import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  data: JSON.parse(localStorage.getItem('data')) ||  [],
  previousRequest: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.data = action.payload.data;
      state.previousRequest = action.payload.previousRequest;
      localStorage.setItem('data', JSON.stringify(state.data))
      localStorage.setItem(
        "previousRequest",
        JSON.stringify(state.previousRequest)
      );
    },
    clearStoreData: (state) => {
      state.data = [];
      localStorage.removeItem('data')
      localStorage.removeItem("previousRequest");
    },
  },
});

export const { setStoreData, clearStoreData } = dataSlice.actions;
export default dataSlice.reducer;
