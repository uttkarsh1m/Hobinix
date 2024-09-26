import { createSlice } from '@reduxjs/toolkit';
import {
    RegisterUser,
    loginUser,
    loadUser,
    getUserDetails,
    followUser,
} from '../actions/userActions';
import { toast } from 'react-toastify';

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: null,
        auth: false,
        loading: false,
        error: null,
    },
    extraReducers: {
        [RegisterUser.pending]: state => {
            state.loading = true;
        },
        [RegisterUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.auth = true;
            state.user = action.payload.data.user;
        },
        [RegisterUser.rejected]: (state, action) => {
            state.loading = false;
            state.auth = false;
            state.error = action.payload;
        },

        [loginUser.pending]: state => {
            state.loading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            toast.success('action.payload.data.message');
            setTimeout(() => {
                window.location.href = '/music';
            }, 2000);
            state.loading = false;
            state.auth = true;
            state.user = action.payload.data.user;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.auth = false;
            state.error = action.payload;
        },

        [loadUser.pending]: state => {
            state.loading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.auth = true;
            state.user = action.payload.data.user;
        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false;
            state.auth = false;
            state.error = action.payload;
        },
    },
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers: {
        [getUserDetails.pending]: state => {
            state.loading = true;
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
        },
        [getUserDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // [followUser.pending]: state => {
        // state.loading = true;
        // },
        [followUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload.data.requestedUser;
        },
        [followUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;
export const userReducer = userSlice.reducer;
