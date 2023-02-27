import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      state.userLoggedIn = true;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
