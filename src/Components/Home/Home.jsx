import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const Home = () => {
    return (
        <div className=''>
           
            <Navbar/>
          
           <div className='w-[87.94vw] mx-auto '>
           <Outlet/>
           <Footer/>
           </div>
            
        </div>
    );
};

export default Home;