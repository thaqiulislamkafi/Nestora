import React from 'react';
import { NavLink } from 'react-router';
import {
  FaUser, FaHeart, FaHome, FaStar, FaTasks, FaUsersCog,
  FaStarHalfAlt, FaBullhorn, FaPlusCircle, FaCheckCircle, FaHandshake,
  FaHouseUser
} from 'react-icons/fa';
import UseUserRole from '../Hooks/useUserRole';
import { MdDashboard } from 'react-icons/md';

const BreadcrumbsNav = () => {
//   const { currentUser } = useAuth();
  const { role } = UseUserRole();


  const commonLinks = [
    { to: '/', label: 'Home', icon: <FaHouseUser /> },
    { to: '/dashboard/myProfile', label: 'My Profile', icon: <FaUser /> },
  ];

  const userLinks = [
    { to: '/dashboard/user-dashboard', label: 'Dashboard', icon: <MdDashboard /> },
    { to: '/dashboard/wishlist', label: 'Wishlist', icon: <FaHeart /> },
    { to: '/dashboard/property-bought', label: 'Bought Properties', icon: <FaHome /> },
    { to: '/dashboard/my-reviews', label: 'My Reviews', icon: <FaStar /> },
  ];

  const adminLinks = [
    { to: '/dashboard/manageProperties', label: 'Manage Properties', icon: <FaTasks /> },
    { to: '/dashboard/manageUsers', label: 'Manage Users', icon: <FaUsersCog /> },
    { to: '/dashboard/manageReviews', label: 'Manage Reviews', icon: <FaStarHalfAlt /> },
    { to: '/dashboard/advertiseProperty', label: 'Advertise Property', icon: <FaBullhorn /> },
  ];

  const agentLinks = [
    { to: '/dashboard/add-property', label: 'Add Property', icon: <FaPlusCircle /> },
    { to: '/dashboard/my-properties', label: 'My Added Properties', icon: <FaHome /> },
    { to: '/dashboard/sold-properties', label: 'My Sold Properties', icon: <FaCheckCircle /> },
    { to: '/dashboard/requested-properties', label: 'Requested Properties', icon: <FaHandshake /> },
  ];

  let roleLinks = [];
  if (role === 'user') roleLinks = userLinks;
  else if (role === 'admin') roleLinks = adminLinks;
  else if (role === 'agent') roleLinks = agentLinks;

  const linksToShow = [...commonLinks, ...roleLinks];

  return (
    <div className="breadcrumbs flex text-sm lg:hidden py-4 bg-base-200 border-b shadow-sm overflow-x-auto ">
      <ul className="flex justify-center gap-2">
        {linksToShow.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1 rounded-full transition-all 
                 ${isActive
                    ? 'bg-[#fceb00] text-gray-900 font-semibold shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#fceb00] hover:text-gray-900'}`
              }
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadcrumbsNav;
