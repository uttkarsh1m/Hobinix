import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const GoToTop = () => {
    return (
        <div className="w-10 h-10 flex justify-center items-center fixed bottom-16 right-20 z-10 shadow-black shadow-2xl rounded-full bg-[#1dd6627f] hover:bg-emerald-500 cursor-pointer text-black">
            <ArrowUpwardIcon sx={{ fontSize: 30 }} />
        </div>
    );
};

export default GoToTop;
