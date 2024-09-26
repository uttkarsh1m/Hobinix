import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gojo from '../../assets/tests/Gojo.jpeg';
import Spinner from '../utils/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../actions/otherActions';
import { motion } from 'framer-motion';

const Searchbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, searchedData } = useSelector(state => state.search);

    const [ShowedData, setShowedData] = useState([]);
    const [cat, setCat] = useState('Users');
    const [content, setContent] = useState('');

    const handleData = () => {
        if (cat === 'Users') setShowedData(searchedData.users);
        else if (cat === 'Albums') setShowedData(searchedData.albums);
        else if (cat === 'Songs') setShowedData(searchedData.songs);
        else if (cat === 'Photos') setShowedData(searchedData.photos);
        else if (cat === 'Dances') setShowedData(searchedData.dances);
    };

    const handleChange = e => {
        setContent(e.target.value);
        if (e.target.value.trim() !== '')
            dispatch(search(e.target.value.trim()));
        else setShowedData([]);
    };

    useEffect(() => {
        if (searchedData) handleData();
    }, [cat]);

    useEffect(() => {
        if (searchedData) {
            handleData();
            setTimeout(() => {
                if (ShowedData.length === 0) {
                    if (searchedData.users.length !== 0) setCat('Users');
                    else if (searchedData.albums.length !== 0) setCat('Albums');
                    else if (searchedData.songs.length !== 0) setCat('Songs');
                    else if (searchedData.photos.length !== 0) setCat('Photos');
                    else if (searchedData.dances.length !== 0) setCat('Dances');
                    handleData();
                }
            }, 100);
        }
    }, [searchedData]);

    const handleClick = id => {
        if (cat === 'Users') navigate(`/user/${id}`);
        else if (cat === 'Albums') navigate(`/music/album/${id}`);
        else if (cat === 'Dances') navigate(`/dance/${id}`);
        else if (cat === 'Photos') navigate(`/gallery/${id}`);
        // else{

        // }
    };

    return (
        <Container className="bg-neutral-950 border-slate-800 py-6 px-5 pl-2 w-[392px] min-h-screen">
            <div class="relative mb-4">
                <input
                    value={content}
                    onChange={handleChange}
                    class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            <div className="py-3 px-3 mt-2 flex space-x-7 bg-neutral-900 overflow-x-auto w-full">
                {category.map((e, i) => {
                    return (
                        <button
                            key={i}
                            className={`button flex items-center py-1 px-4 border-[1px] border-zinc-100 whitespace-nowrap rounded-full font-serif text-lg text-zinc-200 hover:border-emerald-600 hover:text-emerald-300 ${
                                cat === e &&
                                'border-emerald-500 text-emerald-200'
                            }`}
                            onClick={() => setCat(e)}
                        >
                            {e}
                        </button>
                    );
                })}
            </div>
            {loading ? (
                <div className="">
                    <Spinner />
                </div>
            ) : (
                <table className="table-auto w-full border-separate border-spacing-y-1 mt-2">
                    <tbody className="text-slate-400 cursor-pointer">
                        {ShowedData && ShowedData.length === 0 ? (
                            <span className="px-2">no result</span>
                        ) : (
                            ShowedData.map((e, i) => {
                                return (
                                    <motion.tr
                                        className="hover:text-zinc-200 hover:shadow-md bg-neutral-950 hover:!bg-neutral-900 shadow-white rounded-lg"
                                        initial={{ opacity: 0, x: 150 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            type: 'spring',
                                            delay: 0.2 * i,
                                        }}
                                        onClick={() => {
                                            handleClick(e._id);
                                        }}
                                    >
                                        <td className="flex justify-center">
                                            <span>{i + 1}.</span>
                                        </td>
                                        <td className="text-left pl-5">
                                            <div className="flex items-center gap-10">
                                                <img
                                                    src={
                                                        cat === 'Photos'
                                                            ? e.url
                                                            : e.thumbUrl || gojo
                                                    }
                                                    className={`w-12 h-12 ${
                                                        cat === 'Users'
                                                            ? 'rounded-full'
                                                            : 'rounded-lg'
                                                    }`}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-100">
                                                        {cat === 'Users'
                                                            ? e.username
                                                            : e.title ||
                                                              e.caption}
                                                    </span>
                                                    {/* <span className="text-xs">
                                                        {e.artist.username ||
                                                            e.postedBy.username ||
                                                            'hello'}
                                                    </span> */}
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            )}
        </Container>
    );
};

const Container = styled.div`
    /* pagination*/
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 12.5px 10px;
        width: 290px;
        background-color: white;
        border-radius: 12px;
    }
    .css-97z993-MuiPaper-root {
        background-color: transparent;
    }
    .css-1ex1afd-MuiTableCell-root {
        border-bottom: 1px solid grey;
        color: white;
        padding: 5px;
    }
    tbody tr {
        td {
            padding: 6px 6px;
        }
    }
`;

export default Searchbar;

const category = ['Users', 'Albums', 'Songs', 'Photos', 'Dances'];
