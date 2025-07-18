import React from 'react';
import NavSideBar from './NavSideBar';
import { Outlet } from 'react-router';
import BreadcrumbsNav from './BreadcrumbsNav';

const Dashboard = () => {
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100 inter-font">
            
                <div className="hidden lg:flex w-1/5 bg-white shadow-lg">
                    <NavSideBar />
                </div>

                <div className="">
                    <BreadcrumbsNav />
                </div>
           
            <div className="lg:w-4/5 p-3 lg:p-6 overflow-x-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;