import React from 'react';
import bg from '../../assets/tests/background.jpeg';

const Background = () => {
    return (
        <div className="w-screen h-screen fixed -z-10 after:fixed after:top-0 after:h-screen after:w-screen after:bg-[rgba(0,0,0,0.1)]">
            <img
                src={bg}
                className="w-screen h-screen object-cover -z-50 fixed"
            />
        </div>
    );
};

export default Background;
