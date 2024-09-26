import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '../utils/Button';
import { motion } from 'framer-motion';

const SongUpload = ({
    songs,
    setSongs,
    songThumbs,
    setSongThumbs,
    songDetails,
    setSongDetails,
    close,
}) => {
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState();
    const [song, setSong] = useState();
    const [thumbUrl, setThumbUrl] = useState();
    const [songUrl, setSongUrl] = useState();

    const handlePhoto = e => {
        if (e.target.files.length !== 0)
            setThumbUrl(URL.createObjectURL(e.target.files[0]));
        setPhoto(e.target.files[0]);
        console.log(photo);
    };
    const handleAudio = e => {
        if (e.target.files.length !== 0)
            setSongUrl(URL.createObjectURL(e.target.files[0]));
        setSong(e.target.files[0]);
    };
    const handleSubmit = () => {
        console.log(title, photo, song);
        title.trim();
        if (!title) {
            console.log('enter name');
            return;
        }
        if (!photo) {
            console.log('enter thumbnail');
            return;
        }
        if (!song) {
            console.log('enter song');
            return;
        }
        setSongDetails([...songDetails, { title, thumbUrl, url: songUrl }]);
        setSongs([...songs, song]);
        setSongThumbs([...songThumbs, photo]);
        close();
    };

    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Container className="p-4 flex flex-col items-center gap-8 bg-[#00000099] text-white rounded-lg">
                <span className="text-2xl font-semibold tracking-wider">
                    Add Song Details
                </span>
                <form className="flex flex-col items-center gap-6">
                    <TextField
                        id="outlined-error"
                        label="Name of the Song"
                        name="name"
                        variant="outlined"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                        }}
                        placeholder="Enter the song name here"
                    />
                    <div class="flex items-center gap-4">
                        {thumbUrl ? (
                            <img
                                class="h-16 w-16 object-cover rounded-lg"
                                src={thumbUrl}
                            />
                        ) : (
                            <span className="font-semibold">
                                Choose Thumbnail
                            </span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            class="text-sm text-slate-500 bg-[#0006] rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            onChange={handlePhoto}
                        />
                    </div>
                    <div class="flex items-center gap-4">
                        {/* {url ? (
                        <img
                            class="h-16 w-16 object-cover rounded-full"
                            src={url}
                        />
                    ) : (
                        <span className="font-semibold">
                            Add Song
                        </span>
                    )} */}
                        <input
                            type="file"
                            accept="audio/*"
                            class="text-sm text-slate-500 bg-[#0006] rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            onChange={handleAudio}
                        />
                    </div>
                    <div onClick={handleSubmit}>
                        <Button value="Submit" style="py-2" />
                    </div>
                </form>
            </Container>
        </motion.div>
    );
};

const Container = styled.div`
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
        color: white;
    }
    .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: 2px solid #beffd2;
    }
    .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
        color: #beffd2d9;
    }
    .MuiOutlinedInput-notchedOutline {
        color: #5acb9a;
    }
    label.Mui-focused {
        color: white;
    }
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        min-width: 24.5vw;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
        .MuiOutlinedInput-notchedOutline {
        border: 3px solid #4acaaa;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover
        .MuiOutlinedInput-notchedOutline {
        border: 2px solid #83d3bfde;
    }
    .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root {
        color: #8dcabf99;
    }
`;

export default SongUpload;
