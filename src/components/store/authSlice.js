import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchLimit } from "./actionCreators";


const initialState = {
  isAuthenticated: false,
  login: '',
  password: '',
  usedCompanyCount: 0,
  companyLimit: 0,
  accessToken: null,
  isLoading: false,
  error: ''
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null
      localStorage.removeItem('accessToken')
      state.login = '';
      state.password = '';
    },
    setCredentials: (state, action) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.isAuthenticated = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка авторизации';
      })
      .addCase(fetchLimit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLimit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usedCompanyCount = action.payload.usedCompanyCount;
        state.companyLimit = action.payload.companyLimit;
      })
      .addCase(fetchLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка авторизации';
      })
      .addCase('auth/restoreAuth', (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      });
  }
});

export const selectAccessToken = ((state) => state.auth.accessToken)

export const {
  clearCredentials,
  logout,
  setCredentials,
} = authSlice.actions;
export default authSlice.reducer;
