import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  isBootstrapping: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  isBootstrapping: true,
};

export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: RolePermission;
}

export enum RolePermission {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.isBootstrapping = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.isBootstrapping = true;
    }
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
