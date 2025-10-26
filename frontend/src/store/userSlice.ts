import {createSlice} from "@reduxjs/toolkit";

interface RootState {
  user: {
    isAuthenticated: boolean;
    name: string;
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: <RootState['user']>{
    isAuthenticated: false,
    userInfo: null,
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
  },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
