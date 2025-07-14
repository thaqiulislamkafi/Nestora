import React from 'react';
import NavSideBar from './NavSideBar';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100 inter-font">
           
            <div className="w-1/5 bg-white shadow-lg">
                <NavSideBar />
            </div>
            
           
            <div className="w-4/5 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;