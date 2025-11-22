import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.ts";
import eventReducer from "./eventSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        events: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
