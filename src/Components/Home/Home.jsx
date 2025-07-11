import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div className='w-[87.94vw] mx-auto '>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Home;