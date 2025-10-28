import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    isBootstrapping: true,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    bootstrapUser: (state, action) => {
      console.log("Bootstrapping user:", action.payload);
      // Called on app startup if a session token exists
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
      state.isBootstrapping = action.payload.isBootstrapping;
    },
  },
});

export const {login, logout, bootstrapUser} = userSlice.actions;
export default userSlice.reducer;
