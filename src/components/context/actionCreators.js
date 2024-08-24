import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchAuth = createAsyncThunk(
    'auth/fetchAll',
    async (_, { getState, rejectWithValue  }) => {
      const { login, password } = getState().auth; 
        try {
          const response = await axios.post(
            "https://gateway.scan-interfax.ru/api/v1/account/login",
            { login, password }
          );
          return response.data;
          } catch (e) {
            if (e.response && e.response.data) {
              return rejectWithValue(e.response.data.message || "Не удалось загрузить данные");
            }
            console.error("Unexpected error:", e);
            return rejectWithValue("Не удалось загрузить данные");
          }
        }
      )

export const fetchLimit = createAsyncThunk(
  'limit/fetchAll',
  async (_, { getState, rejectWithValue }) => {
      try {
          const { accessToken } = getState().auth
          const response = await axios.get("https://gateway.scan-interfax.ru/api/v1/account/info", {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const {usedCompanyCount, companyLimit} = response.data.eventFiltersInfo
          return {usedCompanyCount, companyLimit}
      } catch (e) {
          return rejectWithValue(e.response?.data?.message || "Не удалось загрузить данные лимита")
      }
  }
)

export const restoreAuth = createAsyncThunk(
  'auth/restoreAuth',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch({
        type: 'auth/restoreAuth',
        payload: { accessToken: token }
      });

      await dispatch(fetchLimit());
    }
  }
);
