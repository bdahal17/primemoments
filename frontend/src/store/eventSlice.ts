import {createSlice} from "@reduxjs/toolkit";


export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
        }
    },

})

export const {setEvents, addEvent} = eventSlice.actions;

export default eventSlice.reducer;
