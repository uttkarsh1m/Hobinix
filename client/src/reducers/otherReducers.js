import { createSlice } from '@reduxjs/toolkit';
import { search } from '../actions/otherActions';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchedData: null,
        loading: false,
    },
    extraReducers: {
        [search.pending]: state => {
            state.loading = true;
        },
        [search.fulfilled]: (state, action) => {
            state.loading = false;
            state.searchedData = action.payload;
        },
        [search.rejected]: state => {
            state.loading = false;
        },
    },
});

export const searchReducer = searchSlice.reducer;
