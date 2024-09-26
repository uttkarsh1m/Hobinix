import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import CategoryBar from '../../components/appbars/CategoryBar';
import AlbumUpload from '../../components/music/AlbumUpload';

const AlbumPost = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
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
                    <CategoryBar post />
                    <AlbumUpload />
                </div>
            </div>
        </div>
    );
};

const Container = styled.div``;

export default AlbumPost;
