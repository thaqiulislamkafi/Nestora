import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="mx-auto w-[600px] rounded-xl overflow-hidden drop-shadow-2xl inter-font">
       
          <div className="flex p-8 justify-center items-center h-[450px]">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 border-4 border-t-[#fceb00] border-gray-100 rounded-full animate-spin mx-auto" />
              <div className="text-[#fceb00] font-semibold text-4xl opacity-90 animate-fadeIn">
                Almost There...
              </div>
              <div className="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
                <p>We're getting everything ready for you...</p>
                <p>Sit tight for just a moment.</p>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Loading;