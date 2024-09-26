import React, {useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PostItem from './PostItem';

const AllPosts = ({ posts, dance }) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    useEffect(()=>{
        console.log('helllllllllllllll', posts)
        console.log(typeof(posts))
    },[])
    return (
        <div className="flex flex-col w-full h-full py-2 px-5 overflow-y-auto">
            <ImageList
                variant="masonry"
                cols={3}
                gap={sm ? 8 : 4}
                sx={{ borderRadius: '12px' }}
            >
                {posts.map((e, i) =>{ 
                    return <PostItem key={i} post={e} dance={dance} />
                })}
            </ImageList>
        </div>
    );
};

export default AllPosts;
