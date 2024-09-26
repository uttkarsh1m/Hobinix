import React from 'react';

const Button = ({ value, style, onClick }) => {
    return (
        <div
            className={`border-zinc-100 font-semibold text-center w-[122.21px] h-min border-[1.35px] hover:bg-[#3ca78d33] py-1 px-2 rounded-lg whitespace-nowrap cursor-pointer active:border-teal-600 active:text-teal-600 focus:text-emerald-600 focus:border-emerald-600 ${style}`}
            onClick={onClick}
        >
            {value}
        </div>
    );
};

export default Button;
