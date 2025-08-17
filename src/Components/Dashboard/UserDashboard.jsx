import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  FaShoppingCart,
  FaHeart,
  FaTimesCircle,
  FaDollarSign,
  FaUser,
  FaHome,
  FaMapMarkerAlt,
  FaIdBadge
} from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const UserDashboard = () => {

  const axiosSecure = useAxios() ;
  const {currentUser} = use(AuthContext) ;

  const { data: dashboardData, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async()=>{
        const {data} = await axiosSecure(`/get-user-dashboard-data?email=${currentUser?.email}`) ;
        return data ;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error fetching dashboard data</span>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="alert alert-warning shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>No data available</span>
        </div>
      </div>
    );
  }

  // Stats Cards Data
  const stats = [
    {
      title: 'Total Bought Properties',
      value: dashboardData?.stats?.totalBought,
      icon: <FaShoppingCart className="text-2xl" />,
      color: 'bg-success text-success-content'
    },
    {
      title: 'Total Bought Amount',
      value: `৳${dashboardData?.stats?.totalBoughtAmount.toLocaleString()}`,
      icon: <FaDollarSign className="text-2xl" />,
      color: 'bg-info text-info-content'
    },
    {
      title: 'Total Wishlist',
      value: dashboardData?.stats?.totalWishlist,
      icon: <FaHeart className="text-2xl" />,
      color: 'bg-secondary text-secondary-content'
    },
    {
      title: 'Total Rejected',
      value: dashboardData?.stats?.totalRejected,
      icon: <FaTimesCircle className="text-2xl" />,
      color: 'bg-error text-error-content'
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* User Profile Header */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={dashboardData?.user.photo} alt={dashboardData?.user.name} />
              </div>
            </div>
            <div>
              <h2 className="card-title">{dashboardData?.user.name}</h2>
              <p className="text-gray-500">{dashboardData?.user.email}</p>
              <div className="flex items-center mt-1 space-x-2">
                <FaUser className="text-gray-400" />
                <span>{dashboardData?.user.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`card ${stat.color} shadow`}>
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{stat.value}</h3>
                  <p className="text-sm">{stat.title}</p>
                </div>
                <div className="p-3 rounded-full bg-opacity-20 bg-white">
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Wishlist Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Latest Wishlist</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Offer Amount</th>
                  <th>Agent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.latestWishlist.map((item) => (
                  <tr key={item.propertyId}>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">{item.propertyTitle}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> {item.location}
                        </span>
                      </div>
                    </td>
                    <td>৳{item.offerAmount.toLocaleString()}</td>
                    <td>{item.agentName}</td>
                    <td>
                      <span className={`badge ${item.status === 'rejected' ? 'badge-error' : 'badge-info'}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Latest Purchases Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Latest Purchases</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Purchase Amount</th>
                  <th>Agent</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.latestPurchases.map((item) => (
                  <tr key={item.propertyId}>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">{item.propertyTitle}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> {item.location}
                        </span>
                      </div>
                    </td>
                    <td>৳{item.offerAmount.toLocaleString()}</td>
                    <td>{item.agentName}</td>
                    <td>
                      <div className="badge badge-ghost">
                        {item.transactionId}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;