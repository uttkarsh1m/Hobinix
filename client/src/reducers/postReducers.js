import { createSlice } from '@reduxjs/toolkit';
import {
    photoPost,
    dancePost,
    getAllPhotos,
    getAllDances,
    getPostById,
    likePost,
    savePost,
    getSavedPosts,
} from '../actions/postActions';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
        loading: false,
        error: null,
        posts: null,
        savedPosts: null,
    },
    extraReducers: {
        [photoPost.pending]: state => {
            state.loading = true;
            state.error = null;
            state.post = null;
        },
        [photoPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload.data;
        },
        [photoPost.rejected]: (state, action) => {
            state.error = action.payload.data;
        },

        [dancePost.pending]: state => {
            state.loading = true;
            state.error = null;
            state.post = null;
        },
        [dancePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload.data;
        },
        [dancePost.rejected]: (state, action) => {
            state.error = action.payload.data;
        },

        [getAllPhotos.pending]: state => {
            state.loading = true;
        },
        [getAllPhotos.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.data;
        },
        [getAllPhotos.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        },

        [getAllDances.pending]: state => {
            state.loading = true;
        },
        [getAllDances.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.data;
        },
        [getAllDances.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.data;
        },
        [getPostById.pending]: state => {
            state.loading = true;
        },
        [getPostById.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload.data;
        },
        [getPostById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // [likePost.pending]: state =>{
        // state.loading = true
        // },
        [likePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload.data.post;
        },
        [likePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // [savePost.pending]: state =>{
        // state.loading = true
        // },
        [savePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload.data.post;
        },
        [savePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [getSavedPosts.pending]: state => {
            state.loading = true
        },
        [getSavedPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.savedPosts = action.payload.data.posts
        },
        [getSavedPosts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
});

export const postReducer = postSlice.reducer;
