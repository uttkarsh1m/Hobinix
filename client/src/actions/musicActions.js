import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    ALBUMBYID,
    ALBUM_UPLOAD,
    TOGGLE_PLAY,
    NEXT_SONG,
    PREVIOUS_SONG,
    TARGET_SONG,
    CLEAR_SONG,
    SONG_LOADING,
    SET_ALBUM,
    TRENDING_ALBUMS,
    NEW_RELEASES,
    LIKE_ALBUM,
    LIKE_SONG,
    SAVE_ALBUM,
    SAVE_SONG,
    GET_SAVED_ALBUMS,
    GET_SAVED_SONGS
} from '../constants/musicConstants';
import { toast } from 'react-toastify';

export const togglePlay = createAction(TOGGLE_PLAY);

export const setAlbum = createAction(SET_ALBUM);

export const targetSong = createAction(TARGET_SONG);

export const clearSong = createAction(CLEAR_SONG);

export const songLoading = createAction(SONG_LOADING);

export const prevSong = createAction(PREVIOUS_SONG);

export const nextSong = createAction(NEXT_SONG);

export const albumUpload = createAsyncThunk(
    ALBUM_UPLOAD,
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post('/api/music/albums', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.href = '/music';
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getTrendingAlbums = createAsyncThunk(
    TRENDING_ALBUMS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/music/albums/trendings');
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getNewReleases = createAsyncThunk(
    NEW_RELEASES,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/music/albums/new_releases');
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getAlbumById = createAsyncThunk(
    ALBUMBYID,
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/music/albums/${id}`);
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const likeAlbum = createAsyncThunk(
    LIKE_ALBUM,
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/music/albums/like/${id}`);
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);
export const likeSong = createAsyncThunk(
    LIKE_SONG,
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/music/songs/like/${id}`);
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);
export const saveAlbum = createAsyncThunk(
    SAVE_ALBUM,
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/music/albums/save/${id}`);
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);
export const saveSong = createAsyncThunk(
    SAVE_SONG,
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/api/music/songs/save/${id}`);
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getSavedAlbums = createAsyncThunk(
    GET_SAVED_ALBUMS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/music/albums/saves');
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);

export const getSavedSongs = createAsyncThunk(
    GET_SAVED_SONGS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/api/music/songs/saves');
            console.log(res);
            return res.data;
        } catch (e) {
            toast.error(e.response.data.message);
            return rejectWithValue(e.response.data);
        }
    }
);
