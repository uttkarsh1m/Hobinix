import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';
import SharePost from '../utils/SharePost';

const VideoPlayer = ({
    upload,
    url,
    post,
    close,
    isLiked,
    likeNum,
    handleLike,
    isSaved,
    handleSave,
}) => {
    const navigate = useNavigate()
    const [isPlaying, setIsPlaying] = useState(post);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(false);
    const videoRef = useRef();

    const handlePlaying = async () => {
        if (isPlaying) await videoRef.current.pause();
        else await videoRef.current.play();
        setIsPlaying(!isPlaying);
    };
    const handleSlide = e => {
        setCurrentTime(e.target.value);
        videoRef.current.currentTime = e.target.value;
    };
    const handleVolume = e => {
        e.stopPropagation();
        if (volume) setVolume(false);
        else setVolume(true);
    };
    const formatTime = secs => {
        secs = Math.round(secs);
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = secs - minutes * 60 || 0;
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    return (
        <Container className="h-screen w-full flex justify-center pt-2 pb-4 text-zinc-200">
            <div
                className="group max-w-[400px] h-full relative flex justify-center items-center bg-neutral-950 rounded-lg drop-shadow-xl cursor-pointer"
                onClick={handlePlaying}
            >
                <video
                    src={url || post.url}
                    ref={videoRef}
                    loop
                    muted={!volume}
                    autoPlay={post}
                    onTimeUpdate={e => {
                        setCurrentTime(videoRef.current.currentTime);
                    }}
                    onLoadedMetadata={() => {
                        setDuration(videoRef.current.duration);
                    }}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
                <div className="absolute top-0 w-full p-6 justify-between items-center hidden group-hover:flex">
                    <div
                        className={`bg-[#00000072] w-10 h-10 flex justify-center items-center rounded-full ${
                            upload && 'hidden'
                        }`}
                        onClick={e => {
                            e.stopPropagation();
                            if(close) close();
                            else navigate(-1)
                        }}
                    >
                        <ChevronLeftRoundedIcon sx={{ fontSize: 36 }} />
                    </div>
                    <div
                        className="bg-[#00000072] w-10 h-10 flex justify-center items-center rounded-full"
                        onClick={handleVolume}
                    >
                        {volume && <VolumeUpIcon sx={{ fontSize: 28 }} />}
                        {!volume && <VolumeOffIcon sx={{ fontSize: 28 }} />}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-32 flex-col-reverse items-start p-6 bg-gradient-to-t from-neutral-800 rounded-lg hidden group-hover:flex">
                    <Slider
                        size="default"
                        aria-label="Default"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSlide}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    />
                    <span className="text-xs">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>
                <div className="bg-[#00000072] absolute w-14 h-14 justify-center items-center rounded-full hidden group-hover:flex">
                    {isPlaying && <PauseIcon sx={{ fontSize: 50 }} />}
                    {!isPlaying && <PlayArrowIcon sx={{ fontSize: 50 }} />}
                </div>
            </div>
            <div
                className={`w-14 h-full flex flex-col-reverse items-center justify-center gap-5 relative top-36 ${
                    upload && 'hidden'
                }`}
            >
                {post && <SharePost id={post._id} />}
                <div className="cursor-pointer" onClick={handleSave}>
                    {isSaved && <BookmarkAddedIcon sx={{ fontSize: 33 }} />}
                    {!isSaved && (
                        <BookmarkAddOutlinedIcon sx={{ fontSize: 33 }} />
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="cursor-pointer" onClick={handleLike}>
                        {isLiked && <FavoriteIcon sx={{ fontSize: 30 }} />}
                        {!isLiked && (
                            <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                        )}
                    </div>
                    <span className="font-semibold text-lg">{likeNum}</span>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    .MuiSlider-track {
        color: green;
    }
    .MuiSlider-thumb {
        color: white;
        width: 16px;
        height: 16px;
    }
    .MuiSlider-rail {
        color: white;
    }
    .popup-content {
        border-color: transparent;
    }
`;

export default VideoPlayer;
