import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SEARCH, SEARCH_LOADING } from '../constants/otherContstants';

export const search = createAsyncThunk(SEARCH, async content => {
    try {
        const res = await axios.get(`/api/search/${content}`);
        return res.data;
    } catch (e) {
        console.log(e.response.data);
    }
});
