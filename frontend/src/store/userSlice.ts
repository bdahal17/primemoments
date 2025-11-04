import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // <-- type-only import

export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}
export interface UserState {
    isAuthenticated: boolean;
    userInfo: UserInfo | null;
    isBootstrapping: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  isBootstrapping: true,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      // state.isBootstrapping = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    bootstrapUser: (state, action: PayloadAction<UserState>) => {
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
