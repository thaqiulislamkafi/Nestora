import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-[#fceb00]" />
            </div>
        </div>
    );
};

export default Loading;