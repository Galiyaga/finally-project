import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    login: "",
    password: "",
    accessToken: "",
    usedCompanyCount: 0,
    companyLimit: 0,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setFormValues: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key === "login" || key === "password") {
          state[key] = value;
        }
      });
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUsedCompanyCount: (state, action) => {
      state.usedCompanyCount = action.payload.usedCompanyCount
    },
    setCompanyLimit: (state, action) => {
      state.companyLimit = action.payload.companyLimit;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setFormValues,
  setAccessToken,
  setUsedCompanyCount,
  setCompanyLimit,
} = authSlice.actions;
export default authSlice.reducer;
