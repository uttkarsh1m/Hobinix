import React, { useEffect, useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import Popup from 'reactjs-popup';
import Photo from './Photo';
import VideoPlayer from './VideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, savePost } from '../../actions/postActions';

const PostItem = ({ post, dance }) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [likeNum, setLikeNum] = useState();
    const [isSaved, setIsSaved] = useState(false);

    const { user } = useSelector(state => state.authUser);

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
        setLikeNum(post.likes.length);
        setIsSaved(post.saves.includes(user._id));
    }, []);

    const handleLike = e => {
        e.stopPropagation();
        dispatch(
            likePost({
                id: post._id,
                category: `${dance ? 'dance' : 'gallery'}`,
            })
        );
        if (isLiked) setLikeNum(likeNum - 1);
        else setLikeNum(likeNum + 1);
        setIsLiked(!isLiked);
    };

    const handleSave = e => {
        e.stopPropagation();
        dispatch(
            savePost({
                id: post._id,
                category: `${dance ? 'dance' : 'gallery'}`,
            })
        );
        setIsSaved(!isSaved);
    };

    return (
        <Popup
            trigger={
                <div className="group relative" key={post.post}>
                    <ImageListItem>
                        <img
                            src={dance ? post.thumbUrl : post.url}
                            loading="lazy"
                            className="rounded-lg cursor-pointer border-[1px] border-neutral-700"
                        />
                    </ImageListItem>
                    <div className="bg-[#00000066] hidden group-hover:flex justify-center items-center z-10 absolute top-0 left-0 gap-4 rounded-lg cursor-pointer w-full h-full text-zinc-200">
                        <div className="flex gap-8 items-start">
                            <div className="flex flex-col items-center gap-1">
                                <div onClick={handleLike}>
                                    {isLiked && (
                                        <FavoriteIcon sx={{ fontSize: 34 }} />
                                    )}
                                    {!isLiked && (
                                        <FavoriteBorderIcon
                                            sx={{ fontSize: 34 }}
                                        />
                                    )}
                                </div>
                                <span className="text-sm font-semibold tracking-wide">
                                    {likeNum}
                                </span>
                            </div>
                            <div onClick={handleSave}>
                                {isSaved && (
                                    <BookmarkAddedIcon sx={{ fontSize: 34 }} />
                                )}
                                {!isSaved && (
                                    <BookmarkAddOutlinedIcon
                                        sx={{ fontSize: 34 }}
                                    />
                                )}
                            </div>
                            <div className="absolute top-2 right-2">
                                {dance ? (
                                    <VideoCameraFrontRoundedIcon
                                        sx={{ fontSize: 30 }}
                                    />
                                ) : (
                                    <CameraAltRoundedIcon
                                        sx={{ fontSize: 26 }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
            modal
            nested
            contentStyle={{
                border: 'none',
                width: '100vw',
                background: 'rgb(0 0 0 / 50%)',
                backdropFilter: 'blur(4px)',
            }}
        >
            {close =>
                dance ? (
                    <VideoPlayer
                        post={post}
                        close={close}
                        isLiked={isLiked}
                        likeNum={likeNum}
                        handleLike={handleLike}
                        isSaved={isSaved}
                        handleSave={handleSave}
                    />
                ) : (
                    <Photo
                        post={post}
                        close={close}
                        isLiked={isLiked}
                        likeNum={likeNum}
                        handleLike={handleLike}
                        isSaved={isSaved}
                        handleSave={handleSave}
                    />
                )
            }
        </Popup>
    );
};

export default PostItem;
