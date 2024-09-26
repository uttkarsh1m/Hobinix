import React, { useEffect } from 'react';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import CategoryBar from '../../components/appbars/CategoryBar';
import MusicHero from '../../components/music/MusicHero';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

const Music = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const { user } = useSelector(state => state.authUser);
    useEffect(() => {
        console.log('music', user);
    }, []);

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
                    <div className="flex flex-col w-full h-full overflow-y-auto">
                        <div className="sm:text-4xl text-3xl text-zinc-200 font-semibold tracking-wide py-3 px-6 sm:px-10">
                            Welcome to Hobinix
                        </div>
                        <MusicHero />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;
