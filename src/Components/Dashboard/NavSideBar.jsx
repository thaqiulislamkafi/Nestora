import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaHome, FaHistory, FaSignOutAlt, FaBoxOpen, FaUser, FaHeart, FaStar, FaPlusCircle, FaCheckCircle, FaHandshake, FaTasks, FaUsersCog, FaStarHalfAlt, FaBullhorn, } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import UseUserRole from '../Hooks/useUserRole';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/authentication';
import Swal from 'sweetalert2';
// import UseUserRole from '../Hooks/UseUserRole';

const NavSideBar = () => {

    const navigate = useNavigate();
    const { currentUser } = use(AuthContext);
    const { role } = UseUserRole();


    const handleLogout = async () => {
            try {
                await signOut(auth);
                Swal.fire({
                    icon: 'success', title: 'Sign Out', text: 'User Signed Out', showConfirmButton: false, timer: 1500
                });
                navigate('/') ;
    
    
            } catch (error) {
                console.error('Error signing out:', error.message);
            }
        };

    return (
        <div className="h-full flex flex-col w-full ">

            {/* User Profile Section  */}
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

            <div className="flex-1 px-7 space-y-2 ">
                <NavLink
                    to="/dashboard/myProfile"
                    className={({ isActive }) =>
                        `flex items-center p-3  rounded-lg transition-colors ${isActive
                            ? 'bg-[#fceb00] text-gray-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`
                    }
                >
                    <FaUser className="mr-3" />
                    <span>My {role=='agent' ? 'Agent' : role=='admin' ? 'Admin' : ''} Profile</span>
                </NavLink>

                {/* Navigation Links for user*/}

                {
                    (role === 'user') &&
                    <>

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
                            <span>Property Bought </span>
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

                    </>
                }



                {
                    (role === 'admin') && <>

                        <NavLink
                            to="/dashboard/manageProperties"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaTasks className="mr-3" />
                            <span>Manage Properties</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/manageUsers"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaUsersCog className="mr-3" />
                            <span>Manage Users</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/manageReviews"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaStarHalfAlt className="mr-3" />
                            <span>Manage Reviews</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/advertiseProperty"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaBullhorn className="mr-3" />
                            <span>Advertise Property</span>
                        </NavLink>



                    </>
                }

                {

                    (role === 'agent') && <>



                        <NavLink
                            to="/dashboard/add-property"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaPlusCircle className="mr-3" />
                            <span>Add Property</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/my-properties"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaHome className="mr-3" />
                            <span>My Added Properties</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/sold-properties"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaCheckCircle className="mr-3" />
                            <span>My Sold Properties</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/requested-properties"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#fceb00] text-gray-900 font-medium'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`
                            }
                        >
                            <FaHandshake className="mr-3" />
                            <span>Requested Properties</span>
                        </NavLink>


                    </>
                }



            </div>

            <div className='divider my-0'></div>

            {/* Logout Button */}
            <div className="px-7 my-2">
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