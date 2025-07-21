import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/authentication";
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {
    // Style for active and normal links

    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? "800" : "600",
            color: isActive ? "white" : "#334155",
            // backgroundColor: isActive ? "#e6d70c" : "transparent",
            borderRadius: "1.3rem",
            padding: "0.5rem 1rem",
            transition: "all 0.3s ease",
            ':hover': {
                backgroundColor: "#CAEB66",
                color: "white"
            }
        };
    };

    const { currentUser } = use(AuthContext);

    const defaultLogo = 'https://img.icons8.com/?size=80&id=ckaioC1qqwCu&format=png'


    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');

        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    const time = new Date().toLocaleTimeString();
    console.log(time)

    return (
        <div className="navbar bg-base-100 rounded-2xl urbanist-font py-8 px-0">
            {/* Nav-first - Logo and App Name */}
            <div className="navbar-start">
                <NavLink to="/" className="flex items-center ">
                    <div className="">
                        <img
                            src="https://i.postimg.cc/0yHTF6Kn/logo.png" // Replace with your logo path
                            alt="App Logo"
                            className="w-full h-auto"
                        />
                    </div>
                    <span className="font-bold text-xl mt-3">Nestora</span>
                </NavLink>
            </div>

            {/* Nav-mid - Navigation Links */}
            <div className="navbar-center hidden px-5 py-2.5 rounded-4xl lg:flex bg-[#fceb00] font-bold">
                <ul className=" menu-horizontal px-1 gap-1">
                    <li>
                        <NavLink to="/" style={navLinkStyle}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/allProperties" style={navLinkStyle}>
                            All Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/coverage" style={navLinkStyle}>
                            Coverage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={navLinkStyle}>
                            About Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/beArider" style={navLinkStyle}>
                            Be a Agent
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Nav-last - Action Buttons */}
            <div className="navbar-end gap-2">

                {
                    currentUser ?
                        <div className="flex items-center gap-1">

                            <div className="tooltip tooltip-bottom" data-tip={currentUser?.displayName}>
                                <Link to={'dashboard/myProfile'}>
                                    <div className="flex items-center gap-2 Button">
                                        <div className=" bg-[#e6d70c] rounded-full">
                                            <img className="w-5 rounded-full" src={currentUser.photoURL ? currentUser.photoURL : defaultLogo} alt="" />
                                        </div>
                                        <span className="hidden lg:flex font-semibold">Dashboard</span>
                                    </div>
                                </Link>
                            </div>

                            <Link onClick={handleSignOut} className="Button bg-[#fceb00]">Sign Out</Link>
                        </div> :
                        <div className="">
                            <NavLink to="/login" className="Button " > Sign In
                            </NavLink>

                            <NavLink to="/signup" className="Button bg-[#fceb00]" > Sign Up </NavLink>
                        </div>
                }


                {/* Mobile menu button */}
                <div className="dropdown dropdown-end lg:hidden px-0">
                    <label tabIndex={0} className="btn btn-ghost ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 z-[1] p-2  bg-base-100 rounded-box w-52"
                    >
                        <li>
                        <NavLink to="/" style={navLinkStyle}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/allProperties" style={navLinkStyle}>
                            All Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/coverage" style={navLinkStyle}>
                            Coverage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={navLinkStyle}>
                            About Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/beArider" style={navLinkStyle}>
                            Be a Agent
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/myProfile" style={navLinkStyle}>
                            Dashboard
                        </NavLink>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;