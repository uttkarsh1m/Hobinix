import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
// import gojo from '../../assets/tests/Gojo.jpeg';
// import sukuna from '../../assets/tests/Sukuna.jpeg';
import { useDispatch } from 'react-redux';
import { targetSong, setAlbum } from '../../actions/musicActions';
import { motion } from 'framer-motion';

const SongList = ({ upload, songs }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAlbum(songs));
    }, [songs]);

    const handlePlaying = i => {
        dispatch(targetSong(i));
    };

    return (
        <>
            {songs && songs.length !== 0 && (
                <Table className="table-auto w-full border-separate border-spacing-y-1">
                    <thead className="text-zinc-200 italic">
                        <tr>
                            <th>#</th>
                            <th className="text-left pl-5 font-mono">Songs</th>
                            <th>
                                <TimerOutlinedIcon
                                    sx={{
                                        position: 'relative',
                                        bottom: '2px',
                                    }}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-400 cursor-pointer">
                        {songs.map((e, i) => {
                            return (
                                <motion.tr
                                    key={i}
                                    className="hover:text-zinc-200 hover:shadow-md bg-neutral-950 hover:!bg-neutral-900 shadow-white rounded-lg"
                                    initial={{ opacity: 0, x: 150 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        delay: 0.8 + 0.2 * i,
                                    }}
                                    onClick={() => {
                                        handlePlaying(i);
                                    }}
                                >
                                    <td className="flex justify-center">
                                        <span>{i + 1}.</span>
                                    </td>
                                    <td className="text-left pl-5">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={e.thumbUrl}
                                                className="w-10 h-10 rounded-lg"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-zinc-100">
                                                    {e.title}
                                                </span>
                                                <span className="text-xs">
                                                    {upload
                                                        ? e.artist
                                                        : e.artist.username}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex justify-center">
                                        3:00
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </>
    );
};

const Table = styled.table`
    tbody tr {
        td {
            padding: 6px 6px;
        }
    }
`;

export default SongList;
