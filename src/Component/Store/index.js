import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice"
import userReducer from "./userSlice"

const store = configureStore({
    reducer: {
        token: tokenSlice,
        user: userReducer
    }
})
export default store;