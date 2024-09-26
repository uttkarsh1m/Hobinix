import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOAD_USER,
    GET_USERDETAILS,
    FOLLOW_USER,
    UPDATE_USER,
    DELETE_USER,
} from '../constants/userConstants';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
    LOGIN_USER,
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log('99999999999',res.data.messege)
            // toast.success(res.data.data.messege);
            // await setTimeout(() => {
            //     window.location.href = '/music';
            // }, 2000);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.messege);
            return rejectWithValue(e.response.data);
        }
    }
);

export const RegisterUser = createAsyncThunk(
    REGISTER_USER,
    async (formData, { rejectWithValue }) => {
        try {
            console.log(formData);
            const res = await axios.post('/api/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success(res.data.data.messege);
            await setTimeout(() => {}, 3000);
            window.location.href = '/music';
            return res.data;
        } catch (e) {
            toast.error(e.response.data.messege);
            return rejectWithValue(e.response.data);
        }
    }
);

export const loadUser = createAsyncThunk(
    LOAD_USER,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/me`);
            return res.data;
            toast.success(res.data.data.messege);
        } catch (e) {
            toast.error(e.response.data.messege);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    GET_USERDETAILS,
    async (username, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/user/${username}`);
            toast.success(res.data.data.messege);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.messege);
            return rejectWithValue(e.response.data);
        }
    }
);

export const followUser = createAsyncThunk(
    FOLLOW_USER,
    async (username, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/user/${username}/follow`);
            toast.success(res.data.data.messege);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.messege);
            return rejectWithValue(e.response.data);
        }
    }
);
