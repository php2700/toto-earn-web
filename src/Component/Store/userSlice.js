import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (_, { rejectWithValue }) => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("totoToken");
            if (!token || !userId) {
                return rejectWithValue("Missing token or userId");
            }

            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_BASE_URL}api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearUserData: (state) => {
            state.userData = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
