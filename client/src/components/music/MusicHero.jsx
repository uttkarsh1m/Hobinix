import React, { useEffect, useState } from 'react';
// import itachi from '../../assets/tests/Naruto Redraws.jpeg';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
import Albums from './Albums';
import { useDispatch, useSelector } from 'react-redux';
import { getNewReleases, getTrendingAlbums } from '../../actions/musicActions';

const MusicHero = () => {
    const dispatch = useDispatch();
    const { trendingAlbums, newReleases } = useSelector(state => state.music);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        dispatch(getNewReleases());
        dispatch(getTrendingAlbums());
    }, []);

    // const handlePlaying = () => {
    //     if (isPlaying) {
    //         setIsPlaying(false);
    //     } else {
    //         setIsPlaying(true);
    //     }
    // };

    return (
        <div className="h-full w-full p-3">
            <div className="flex flex-wrap justify-around gap-3">
                {/* {recents.map(e => {
                    return (
                        <div className="bg-[#254c6a] hover:bg-[#254c6a7f] group md:w-80 sm:max-md:w-72 w-44 relative flex items-center gap-3 rounded-lg pr-1 cursor-pointer">
                            <img
                                src={e.thumbnail}
                                className="w-14 h-14 md:w-20 md:h-20 rounded-lg"
                            />
                            <span className="text-lg text-zinc-200 font-semibold">
                                {e.title}
                            </span>
                            <div
                                className="w-10 h-10 hidden group-hover:flex justify-center items-center absolute right-3 shadow-black shadow-2xl bg-emerald-500 rounded-full cursor-pointer text-black"
                                onClick={handlePlaying}
                            >
                                {isPlaying && (
                                    <PauseIcon sx={{ fontSize: 30 }} />
                                )}
                                {!isPlaying && (
                                    <PlayArrowIcon sx={{ fontSize: 30 }} />
                                )}
                            </div>
                        </div>
                    );
                })} */}
                <span className="text-white text-xl font-semibold ">
                    RECENT PLAYLISTS ARE UNDER DEVELOPMENT
                </span>
            </div>
            {newReleases && (
                <Albums title="New Releases..." albums={newReleases} />
            )}
            {trendingAlbums && (
                <Albums title="Top Trendings..." albums={trendingAlbums} />
            )}
        </div>
    );
};

export default MusicHero;

// const recents = [
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
//     {
//         thumbnail: itachi,
//         title: 'Naruto Uzumaki',
//     },
// ];
