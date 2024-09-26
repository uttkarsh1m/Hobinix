import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSong,
    likeSong,
    nextSong,
    prevSong,
    saveSong,
    setAlbum,
    songLoading,
    togglePlay,
} from '../../actions/musicActions';
import { Link } from 'react-router-dom';

const AudioPlayer = () => {
    const dispatch = useDispatch();

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState();
    const audioRef = useRef();

    const { currentSong, songs, isPlaying, songLoad } = useSelector(
        state => state.music
    );
    const { user } = useSelector(state => state.authUser);

    useEffect(() => {
        if (currentTime === duration) {
            audioRef.current.currentTime = 0;
            dispatch(nextSong());
        }
    }, [currentTime]);

    useEffect(() => {
        async function manageAudio() {
            if (currentSong) {
                console.log('useEffect', isPlaying);
                try {
                    if (isPlaying) {
                        dispatch(songLoading(true));
                        if (audioRef.current) await audioRef.current.play();
                        dispatch(songLoading(false));
                    } else audioRef.current.pause();
                } catch (error) {
                    dispatch(clearSong());
                    console.error(error);
                }
            }
        }
        manageAudio();
    }, [isPlaying, currentSong]);

    const handlePlaying = async () => {
        if (!songLoad) {
            console.log('handlePlaying', isPlaying);
            if (isPlaying) dispatch(togglePlay(false));
            else dispatch(togglePlay(true));
        }
    };

    const previousSong = async () => {
        if (songs.length === 1) {
            audioRef.current.currentTime = 0;
            dispatch(togglePlay(true));
        } else dispatch(prevSong());
    };

    const nxtSong = async () => {
        if (songs.length === 1) {
            audioRef.current.currentTime = 0;
            dispatch(togglePlay(true));
        } else dispatch(nextSong());
    };

    const handleLike = () => {
        dispatch(likeSong(currentSong._id));
    };

    const handleSave = () => {
        dispatch(saveSong(currentSong._id));
    };

    const handleSlide = e => {
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    };

    const removePlayer = () => {
        audioRef.current.pause();
        dispatch(clearSong());
    };

    const formatTime = secs => {
        secs = Math.round(secs);
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = secs - minutes * 60 || 0;
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    return (
        <>
            {currentSong && (
                <motion.div
                    drag
                    dragConstraints={{
                        top: -600,
                        bottom: 0,
                        left: -600,
                        right: 600,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col fixed bottom-3 left-1/2 z-30 rounded-xl py-2 px-6 ml-[-10rem] bg-[rgba(64,138,92,0.2)] text-zinc-200"
                >
                    <div
                        className="absolute top-0 right-1 text-white  rounded-full cursor-pointer"
                        onClick={removePlayer}
                    >
                        <ClearIcon
                            style={{
                                fontSize: 15,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 50,
                                padding: 2,
                            }}
                        />
                    </div>
                    <Container>
                        <div className="flex items-center gap-5 w-64 relative">
                            <img
                                src={currentSong.thumbUrl}
                                className="w-20 h-20 rounded-tl-xl"
                            />
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex flex-col h-min">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-semibold cursor-pointer hover:underline">
                                            {currentSong.title}
                                        </span>
                                        {currentSong.hasOwnProperty(
                                            'likes'
                                        ) && (
                                            <div className="flex gap-3">
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={handleLike}
                                                >
                                                    {currentSong.likes.includes(
                                                        user._id
                                                    ) ? (
                                                        <FavoriteIcon />
                                                    ) : (
                                                        <FavoriteBorderIcon />
                                                    )}
                                                </div>
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={handleSave}
                                                >
                                                    {currentSong.saves.includes(
                                                        user._id
                                                    ) ? (
                                                        <BookmarkAddedIcon />
                                                    ) : (
                                                        <BookmarkAddOutlinedIcon />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-start hover:underline">
                                        <Link
                                            to={`/user/${
                                                currentSong.artist
                                                    ? currentSong.artist
                                                          .username
                                                    : user.username
                                            }`}
                                        >
                                            <span className="text-[0.7rem]">
                                                {currentSong.artist
                                                    ? currentSong.artist
                                                          .username
                                                    : user.username}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-start items-center gap-3">
                                        <SkipPreviousIcon
                                            className="cursor-pointer"
                                            sx={{ fontSize: 30 }}
                                            onClick={previousSong}
                                        />
                                        <div
                                            className="w-8 h-8 flex justify-center items-center bg-zinc-300 rounded-full cursor-pointer text-black"
                                            onClick={handlePlaying}
                                        >
                                            {isPlaying && <PauseIcon />}
                                            {!isPlaying && <PlayArrowIcon />}
                                        </div>
                                        <SkipNextIcon
                                            className="cursor-pointer"
                                            sx={{ fontSize: 30 }}
                                            onClick={nxtSong}
                                        />
                                    </div>
                                    <span className="text-xs">
                                        {formatTime(currentTime)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Slider
                            size="small"
                            aria-label="Small"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSlide}
                        />
                        <audio
                            src={currentSong.url}
                            autoPlay
                            ref={audioRef}
                            onTimeUpdate={e => {
                                setCurrentTime(audioRef.current.currentTime);
                            }}
                            onLoadedMetadata={() => {
                                setDuration(audioRef.current.duration);
                            }}
                        />
                    </Container>
                </motion.div>
            )}
        </>
    );
};

const Container = styled.div`
    .MuiSlider-track {
        color: green;
    }
    .MuiSlider-thumb {
        color: white;
        width: 12px;
        height: 12px;
    }
    .MuiSlider-rail {
        color: white;
    }
`;

export default AudioPlayer;
