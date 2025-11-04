import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})
// inferred types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
