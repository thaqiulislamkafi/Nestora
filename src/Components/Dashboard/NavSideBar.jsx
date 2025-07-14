import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaHome, FaBox, FaMotorcycle, FaUserClock, FaHistory, FaSignOutAlt, FaUsers, FaUserShield, FaBoxOpen, FaClipboardCheck, FaMoneyBill, FaSearchLocation, FaUser, FaHeart, FaStar, } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
// import UseUserRole from '../Hooks/UseUserRole';

const NavSideBar = () => {
    const navigate = useNavigate();

    const { currentUser } = use(AuthContext);
    // const { role } = UseUserRole();

    const role = 'user';

    const handleLogout = () => {
        // Add your logout logic here
        console.log("User logged out");
        navigate('/login');
    };

    return (
        <div className="h-full flex flex-col">

            {/* User Profile Section */}
            {/* <div className="flex items-center  ">
                <div className="">
                    <div className="w-12 rounded-full">
                        <img className='rounded-full' src={currentUser.photoURL} alt="Profile" />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold">{currentUser.displayName}</h3>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
                <button 
                    onClick={() => navigate('/')}
                    className="ml-auto btn btn-ghost btn-sm"
                >
                    <FaHome className="text-lg" />
                </button>
            </div> */}

            <div className="navbar-start relative w-3/4 ">
                <NavLink to="/" className="flex items-center mx-auto mt-2">
                    <div className="">
                        <img
                            src="https://i.postimg.cc/0yHTF6Kn/logo.png"
                            alt="App Logo"
                            className="w-full h-auto"
                        />
                    </div>
                    <span className="font-bold text-2xl mt-5 -ml-3">Nestora</span>
                </NavLink>
            </div>

            <div className='divider my-2'></div>

            {/* Navigation Links */}
            <div className="flex-1 px-7 space-y-2">
                <NavLink
                    to="/dashboard/myProfile"
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaUser className="mr-3" />
                    <span>My Profile</span>
                </NavLink>
                <NavLink
                    to="/dashboard/payment-history"
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'}`
                    }
                >
                    <FaHistory className="mr-3" />
                    <span>Payment History</span>
                </NavLink>

                <NavLink
                    to="/dashboard/wishlist"
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaHeart className="mr-3" />
                    <span>Wishlist</span>
                </NavLink>

                <NavLink
                    to="/dashboard/property-bought"
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaHome className="mr-3" />
                    <span>Property Bought</span>
                </NavLink>

                <NavLink
                    to="/dashboard/my-reviews"
                    className={({ isActive }) =>
                        `flex items-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaStar className="mr-3" />
                    <span>My Reviews</span>
                </NavLink>

                {
                    (role === 'admin') && <>
                        <NavLink
                            to="/dashboard/users"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'}`
                            }
                        >
                            <FaUsers className="mr-3" />
                            <span>Users</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/active-riders"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'}`
                            }
                        >
                            <FaMotorcycle className="mr-3" />
                            <span>Active Riders</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/pending-riders"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'}`
                            }
                        >
                            <FaUserClock className="mr-3" />
                            <span>Pending Riders</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/assigned-riders"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaUserShield className="mr-3" />
                            <span>Assigned Riders</span>
                        </NavLink>

                    </>
                }

                {

                    (role === 'rider') && <>

                        <NavLink
                            to="/dashboard/pending-deliveries"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaBoxOpen className="mr-3" />
                            <span>Pending Deliveries</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/completed-deliveries"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaClipboardCheck className="mr-3" />
                            <span>Completed Deliveries</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/my-earnings"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaMoneyBill className="mr-3" />
                            <span>My Earnings</span>
                        </NavLink>
                    </>
                }



            </div>

            <div className='divider'></div>

            {/* Logout Button */}
            <div className="p-4 ">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                    <FaSignOutAlt className="mr-3" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

export default NavSideBar;