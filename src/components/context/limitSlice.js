import { createSlice } from "@reduxjs/toolkit";

const limitSlice = createSlice({
  name: "limit",
  initialState: {
    usedCompanyCount: 0,
    companyLimit: 0,
    isLoading: false,
    error: ''
  },
  reducers: {
  },
  extraReducers: {
    [fetchLimit.fulfilled.type]: (state, action) => {
        state.isLoading = false;
        state.error = ''
        state.usedCompanyCount = action.payload.usedCompanyCount
        state.companyLimit = action.payload.companyLimit;
    },
    [fetchLimit.pending.type]: (state) => {
        state.isLoading = true;
    },
    [fetchLimit.rejected.type]: (state,  action) => {
        state.isLoading = false;
        state.error = action.payload
    },
}
});



export default limitSlice.reducer;
