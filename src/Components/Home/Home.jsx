import React, { use } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import { AuthContext } from '../Provider/AuthProvider';

// Author : Thaqi Ul Islam Kafi
// Description : The main Structure of main website 
// Date : Year - Month - Date

const Home = () => {
  const { darkMode } = use(AuthContext); 

  return (
    <div
      className={`${
        darkMode
          ? 'dark bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900  text-gray-200'
          : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800'
      } min-h-screen flex flex-col`}
    >
      {/* Navbar always at top */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow w-[87.94vw] mx-auto py-6">
        
        <Outlet />
        <Footer /> 
      </div>

      {/* Footer always at bottom */}
      
    </div>
  );
};

export default Home;
