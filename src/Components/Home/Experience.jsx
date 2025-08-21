import React from "react";
import { FaBuilding, FaUserTie, FaSmile, FaUsers } from "react-icons/fa";

const Experience = () => {
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center inter-font">
      {/* Left Side */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          More Than <span className="text-[#03373D] ">2 Years</span> Experience
        </h1>
        <div className="w-45 h-1 bg-[#fceb00] rounded-full mt-5 my-2"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-lg">
          With over two years of dedicated service in the real estate industry, 
          we’ve built a reputation for <span className="text-gray-800 font-bold">trust</span>, 
          <span className="text-gray-800 font-bold">excellence</span>, and <span className="text-gray-800 font-bold">results</span> . 
          Our expert agents and strong network ensure you find or sell your 
          property with ease and confidence.
        </p>
      </div>

      {/* Right Side */}

      <div className="grid grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl py-6 flex flex-col items-center hover:shadow-2xl transition-all border-t-4 border-[#03373D]">
          <FaBuilding className="text-[#03373D] text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">120+</h2>
          <p className=" text-gray-600 font-medium mt-2">Properties Sold</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl py-6 flex flex-col items-center hover:shadow-2xl transition-all border-t-4 border-green-500">
          <FaUserTie className="text-green-600 text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">25+</h2>
          <p className=" text-gray-600 font-medium mt-2">Total Agents</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl py-6 flex flex-col items-center hover:shadow-2xl transition-all border-t-4 border-yellow-500">
          <FaSmile className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">200+</h2>
          <p className=" text-gray-600 font-medium mt-2">Customers Satisfied</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-2xl py-6 flex flex-col items-center hover:shadow-2xl transition-all border-t-4 border-red-500">
          <FaUsers className="text-red-600 text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">40+</h2>
          <p className=" text-gray-600 font-medium mt-2">Total Workers</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
