import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '../../components/utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getUserDetails } from '../../actions/userActions';
import SharePost from '../utils/SharePost';

const Photo = ({
    post,
    close,
    isLiked,
    likeNum,
    handleLike,
    isSaved,
    handleSave,
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const { user: authUser } = useSelector(state => state.authUser);
    const { user } = useSelector(state => state.user);

    const [fullScreen, setFullScreen] = useState(false);
    const [me, setMe] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (post.postedBy.username === authUser.username) setMe(true);
        dispatch(getUserDetails(post.postedBy.username));
    }, []);

    const handleScreen = () => {
        if (fullScreen) setFullScreen(false);
        else setFullScreen(true);
    };

    const handleFollow = () => {
        dispatch(followUser(post.postedBy.username));
    };

    return (
        <Container
            className={`relative flex gap-4 py-5 pt-16 p- px-5 overflow-y-auto ${
                close ? 'w-screen h-screen' : 'w-full h-full'
            } ${
                md
                    ? 'justify-around items-start'
                    : 'flex-col justify-start items-center'
            }`}
        >
            <div
                className={`bg-[#cccccc66] w-8 h-8 rounded-full absolute top-6 left-10 z-50 flex justify-center items-center cursor-pointer hover:text-slate-700 text-slate-800 ${
                    fullScreen && !close && 'hidden'
                }`}
                onClick={() => {
                    if (close) close();
                    else navigate(-1);
                }}
            >
                <ChevronLeftRoundedIcon sx={{ fontSize: 34 }} />
            </div>
            <div
                className={`${
                    fullScreen && 'w-full h-full fixed top-0 left-0 blur'
                }`}
            />
            <div
                className={`flex justify-center items-center ${
                    fullScreen
                        ? 'w-full h-full fixed top-0 left-0'
                        : md
                        ? 'w-3/5'
                        : 'w-11/12'
                }`}
            >
                <img
                    src={post.url}
                    className={`rounded-2xl object-contain drop-shadow-3xl cursor-pointer ${
                        fullScreen
                            ? 'max-w-screen max-h-screen cursor-zoom-out'
                            : 'max-w-full max-h-[88vh] cursor-zoom-in'
                    }`}
                    onClick={handleScreen}
                    fetchpriority="high"
                />
            </div>
            <div
                className={`${md && 'w-2/6'} gap-4 flex flex-col ${
                    fullScreen && 'hidden'
                }`}
            >
                <span
                    className={`text-zinc-200 ${
                        lg ? 'text-3xl' : 'text-2xl'
                    } font-semibold tracking-wide text-center`}
                >
                    {post.caption}
                </span>
                <div className="text-zinc-200 flex gap-5 items-end mb-4 mt-4 sm:mt-8">
                    <div className="flex justify-between items-start flex-wrap w-full">
                        <div>
                            <span className="text-slate-400 text-sm whitespace-pre">
                                Posted By
                            </span>
                            <Link to={`/user/${post.postedBy.username}`}>
                                <span
                                    className={`text-zinc-200 ${
                                        lg ? 'text-xl' : 'text-lg'
                                    } font-semibold cursor-pointer hover:underline hover:underline-offset-1`}
                                >
                                    {' '}
                                    {post.postedBy.username}
                                </span>
                            </Link>
                        </div>
                    </div>
                    {user && (
                        <Button
                            value={`${
                                user.followers.find(e => {
                                    return e._id === authUser._id;
                                }) || user.followers.includes(authUser._id)
                                    ? 'Unfollow'
                                    : 'Follow'
                            }`}
                            style={`${me && 'hidden'}`}
                            onClick={handleFollow}
                        />
                    )}
                </div>
                <div className="flex justify-around text-white">
                    <SharePost id={post._id} />
                    <div className="flex flex-col items-center gap-1 text-white text-lg">
                        <div className="cursor-pointer" onClick={handleLike}>
                            {isLiked && <FavoriteIcon sx={{ fontSize: 30 }} />}
                            {!isLiked && (
                                <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                            )}
                        </div>
                        <span className="font-semibold">{likeNum}</span>
                    </div>
                    <div className="cursor-pointer" onClick={handleSave}>
                        {isSaved && <BookmarkAddedIcon sx={{ fontSize: 30 }} />}
                        {!isSaved && (
                            <BookmarkAddOutlinedIcon sx={{ fontSize: 30 }} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    .blur {
        backdrop-filter: blur(4px);
    }
`;

export default Photo;
