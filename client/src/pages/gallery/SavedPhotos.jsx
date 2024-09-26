import React, {useEffect} from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import CategoryBar from '../../components/appbars/CategoryBar';
import AllPosts from '../../components/dance-gallery/AllPosts';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonPost from '../../components/utils/SkeletonPost';
import { getSavedPosts } from '../../actions/postActions';

const SavedPhotos = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const { savedPosts, loading } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getSavedPosts('gallery'));
    }, []);

    return (
        <>
            {loading && <SkeletonPost />}
            {savedPosts && (
                <div className="w-screen h-screen">
                    <Appbar />
                    <div className="flex w-screen" style={{ height: '90vh' }}>
                        <Sidebar hidden={true} />
                        <div
                            className="flex flex-col w-full h-full"
                            style={{
                                width: `${
                                    sm ? `${md ? '83vw' : '88vw'}` : '100vw'
                                }`,
                            }}
                        >
                            <CategoryBar saved />
                            <AllPosts posts={savedPosts} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SavedPhotos
