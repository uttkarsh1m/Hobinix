import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import CategoryBar from '../../components/appbars/CategoryBar';
import Photo from '../../components/dance-gallery/Photo';
import Spinner from '../../components/utils/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, likePost, savePost } from '../../actions/postActions';

const PhotoById = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id } = useParams();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
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
        <div className="w-screen h-screen">
            <Appbar />
            <div className="flex w-screen" style={{ height: '90vh' }}>
                <Sidebar hidden={true} />
                <div
                    className="flex flex-col w-full h-full"
                    style={{
                        width: `${sm ? `${md ? '83vw' : '88vw'}` : '100vw'}`,
                    }}
                >
                    <CategoryBar />
                    {post ? (
                        <Photo
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
            </div>
        </div>
    );
};

export default PhotoById;
