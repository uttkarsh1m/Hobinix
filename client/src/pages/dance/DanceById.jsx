import React, {useEffect, useState} from 'react';
import VideoPlayer from '../../components/dance-gallery/VideoPlayer';
import Spinner from '../../components/utils/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, likePost, savePost } from '../../actions/postActions';
import { useParams } from 'react-router-dom';

const VideoById = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const { user } = useSelector(state => state.authUser);
    const { post } = useSelector(state => state.posts);

    const [isLiked, setIsLiked] = useState(false);
    const [likeNum, setLikeNum] = useState();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        dispatch(getPostById(id));
    }, []);

    useEffect(() => {
        if (post) {
            setIsLiked(post.likes.includes(user._id));
            setLikeNum(post.likes.length);
            setIsSaved(post.saves.includes(user._id));
        }
    }, [post]);

    const handleLike = e => {
        e.stopPropagation();
        dispatch(
            likePost({
                id: post._id,
                category: 'gallery',
            })
        );
        if (isLiked) setLikeNum(likeNum - 1);
        else setLikeNum(likeNum + 1);
    };

    const handleSave = e => {
        e.stopPropagation();
        dispatch(
            savePost({
                id: post._id,
                category: 'gallery',
            })
        );
    };

    return (
        <div className="fixed w-screen h-screen bg-neutral-900 flex p-3 justify-center text-zinc-200">
                    {post ? (
                        <VideoPlayer
                            post={post}
                            isLiked={isLiked}
                            likeNum={likeNum}
                            handleLike={handleLike}
                            isSaved={isSaved}
                            handleSave={handleSave}
                        />
                    ) : (
                        <Spinner />
                    )}
        </div>
    );
};

export default VideoById;
