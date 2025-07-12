import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const Home = () => {
    return (
        <div className='w-[87.94vw] mx-auto '>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Home;