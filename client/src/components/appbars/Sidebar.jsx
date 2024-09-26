import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Searchbar from './Searchbar';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = ({ hidden }) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();
    const [state, setState] = useState({ left: false });
    const [path, setPath] = useState('home');

    useEffect(() => {
        const x = window.location.pathname;
        if (x.includes('post')) setPath('post');
        else if (x.includes('saved')) setPath('saved');
        else setPath('home');
    }, [window.location.pathname]);

    const toggleDrawer = (anchor, open) => event => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    return (
        <div
            className={` bg-neutral-950 border-neutral-600 border-r-2 inline-block ${
                hidden ? 'max-sm:hidden h-[90vh]' : 'h-[100vh]'
            }`}
            style={{ width: `${sm ? `${md ? '17vw' : '12vw'}` : '45vw'}` }}
        >
            {!hidden && (
                <div className="border-b-2 border-neutral-600 h-[10vh] flex justify-around items-center text-white font-serif text-2xl font-semibold tracking-wide">
                    HOBINIX
                </div>
            )}
            <div className="flex flex-col justify-around py-4 px-2 space-y-4 text-lg text-white font-semibold">
                <div
                    className={` group flex items-end cursor-pointer py-1 px-2 pr-20 space-x-6 rounded-lg hover:text-emerald-200 hover:bg-neutral-800 hover:border-[1px] hover:border-emerald-500 hover:shadow-md hover:shadow-slate-600 hover:scale-105 active:scale-100 transition-all max-md:pr-2 ${
                        path === 'home' &&
                        'bg-neutral-800 border-[1px] border-white'
                    }`}
                    onClick={() => {
                        navigate('/music');
                        setPath('home');
                        console.log(path);
                    }}
                >
                    <HomeIcon
                        className="group-hover:text-emerald-200"
                        sx={{ fontSize: 32 }}
                    />
                    <span className="tracking-wide sm:max-md:hidden">Home</span>
                </div>
                {['left'].map(anchor => (
                    <div key={anchor}>
                        <div
                            className="group flex items-end cursor-pointer py-1 px-2 pr-20 space-x-6 rounded-lg hover:text-emerald-200 hover:bg-neutral-800 hover:border-[1px] hover:border-emerald-500 hover:shadow-md hover:shadow-slate-600 hover:scale-105 active:scale-100 transition-transform max-md:pr-2"
                            onClick={toggleDrawer(anchor, true)}
                        >
                            <SearchIcon
                                className="group-hover:text-emerald-200"
                                sx={{ fontSize: 32 }}
                            />
                            <span className="tracking-wide sm:max-md:hidden">
                                Search
                            </span>
                        </div>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            className=" bg-transparent"
                        >
                            <Searchbar />
                        </SwipeableDrawer>
                    </div>
                ))}
                <div
                    className={`group flex items-end cursor-pointer py-1 px-2 pr-20 space-x-6 rounded-lg hover:text-emerald-200 hover:bg-neutral-800 hover:border-[1px] hover:border-emerald-500 hover:shadow-md hover:shadow-slate-600 hover:scale-105 active:scale-100 transition-transform max-md:pr-2 ${
                        path === 'post' &&
                        'bg-neutral-900 border-[1px] border-white'
                    }`}
                    onClick={() => {
                        navigate('/music/post');
                        setPath('post');
                        console.log(path);
                    }}
                >
                    <AddCircleOutlineIcon
                        className="group-hover:text-emerald-200"
                        sx={{ fontSize: 32 }}
                    />
                    <span className="tracking-wide sm:max-md:hidden">Post</span>
                </div>
                <div
                    className={`group flex items-end cursor-pointer py-1 px-2 pr-20 space-x-6 rounded-lg hover:text-emerald-200 hover:bg-neutral-800 hover:border-[1px] hover:border-emerald-500 hover:shadow-md hover:shadow-slate-600 hover:scale-105 active:scale-100 transition-transform max-md:pr-2 ${
                        path === 'saved' &&
                        'bg-neutral-900 border-[1px] border-white'
                    }`}
                    onClick={() => {
                        navigate('/music/albums/saved');
                        setPath('post');
                        console.log(path);
                    }}
                >
                    <FavoriteTwoToneIcon
                        className="group-hover:text-emerald-200"
                        sx={{ fontSize: 32 }}
                    />
                    <span className="tracking-wide sm:max-md:hidden">
                        Saved
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
