import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SongList from '../../components/music/SongList';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAlbumById,
    likeAlbum,
    saveAlbum,
    targetSong,
    setAlbum,
    togglePlay,
} from '../../actions/musicActions';
import { motion } from 'framer-motion';

const AlbumById = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { album, currentSong, songs, isPlaying, songLoad } = useSelector(
        state => state.music
    );
    const { user } = useSelector(state => state.authUser);

    useEffect(() => {
        dispatch(getAlbumById(id));
    }, []);

    const handlePlaying = () => {
        if (!songLoad) {
            if (songs && songs !== album.songs) {
                dispatch(setAlbum(album.songs));
                dispatch(targetSong(0));
            } else {
                if (currentSong) {
                    if (isPlaying) dispatch(togglePlay(false));
                    else dispatch(togglePlay(true));
                } else dispatch(targetSong(0));
            }
        }
    };

    const handleLike = () => {
        dispatch(likeAlbum(album._id));
    };

    const handleSave = () => {
        dispatch(saveAlbum(album._id));
    };

    return (
        <div className="w-screen h-screen">
            <Appbar />
            <div className="flex w-screen" style={{ height: '90vh' }}>
                <Sidebar hidden={true} />
                {album && (
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            duration: 2,
                        }}
                    >
                        <Container className="relative w-full h-full p-3 overflow-y-auto">
                            <div
                                className="bg-[#cccccc66] w-8 h-8 rounded-full absolute top-7 left-7 flex justify-center items-center cursor-pointer hover:text-slate-700 text-slate-800"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <ChevronLeftRoundedIcon sx={{ fontSize: 34 }} />
                            </div>
                            <div className="flex items-center flex-wrap gap-5 p-4 pt-16">
                                {/* <motion.div> */}
                                <motion.img
                                    src={album.thumbUrl}
                                    className=" w-52 h-52 rounded-2xl"
                                    // whileHover={rotateX: 1}
                                />
                                {/* </motion.div> */}
                                <div className="flex flex-col gap-3">
                                    <span className=" text-zinc-100 text-xs tracking-wider font-semibold">
                                        Playlist
                                    </span>
                                    <span className="text-zinc-100 md:text-8xl sm:max-md:text-6xl text-5xl tracking-wider font-extrabold font-serif">
                                        {album.title}
                                    </span>
                                    <span className="text-zinc-200 text-lg font-semibold tracking-wide font-serif">
                                        {album.artist.username}
                                    </span>
                                    <div className="text-zinc-200 font-semibold tracking-wide">
                                        HOBINIX • {album.songs.length} songs
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 flex justify-center items-center shadow-black shadow-2xl bg-emerald-500 rounded-full cursor-pointer text-black m-3"
                                    onClick={handlePlaying}
                                >
                                    {currentSong &&
                                    album.songs.find(
                                        o => o._id === currentSong._id
                                    ) &&
                                    isPlaying ? (
                                        <PauseIcon sx={{ fontSize: 30 }} />
                                    ) : (
                                        <PlayArrowIcon sx={{ fontSize: 30 }} />
                                    )}
                                </div>
                                <div
                                    className="cursor-pointer text-emerald-500"
                                    onClick={handleLike}
                                >
                                    {album.likes.includes(user._id) ? (
                                        <FavoriteIcon sx={{ fontSize: 34 }} />
                                    ) : (
                                        <FavoriteBorderIcon
                                            sx={{ fontSize: 34 }}
                                        />
                                    )}
                                </div>
                                <div
                                    className="cursor-pointer text-emerald-500"
                                    onClick={handleSave}
                                >
                                    {album.saves.includes(user._id) ? (
                                        <BookmarkAddedIcon
                                            sx={{ fontSize: 34 }}
                                        />
                                    ) : (
                                        <BookmarkAddOutlinedIcon
                                            sx={{ fontSize: 34 }}
                                        />
                                    )}
                                </div>
                            </div>
                            <SongList songs={album.songs} />
                        </Container>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const Container = styled.div`
    tbody tr {
        td {
            padding: 6px 6px;
        }
        &:hover {
            background-color: rgba(37, 76, 106, 0.5);
        }
    }
`;

export default AlbumById;
