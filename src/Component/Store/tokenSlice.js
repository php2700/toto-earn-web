import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: { token: '' },
    reducers: {
        updateToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;