import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  isAdmin: boolean;
  isBootstrapping: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  isAdmin: false,
  isBootstrapping: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.isAdmin = (state.userInfo?.role && String(state.userInfo.role).toLowerCase() === 'admin');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.isAdmin = false;
    },
    bootstrapUser: (state, action: PayloadAction<{ isAuthenticated: boolean; userInfo: UserInfo | null; isBootstrapping: boolean }>) => {
      console.log("Bootstrapping user:", action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
      state.isBootstrapping = action.payload.isBootstrapping;
      const u = action.payload.userInfo;
      state.isAdmin = !!u && (u?.role && String(u.role).toLowerCase() === 'admin');
    },
  },
});

export const {login, logout, bootstrapUser} = userSlice.actions;
export default userSlice.reducer;