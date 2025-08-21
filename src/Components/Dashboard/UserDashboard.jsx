import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import {FaShoppingCart,FaHeart,FaTimesCircle,FaDollarSign,FaUser,
  FaHome,FaMapMarkerAlt,FaIdBadge} from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import Error from '../SharedElement/Error';
import Loading from '../SharedElement/Loading';

const UserDashboard = () => {

  const axiosSecure = useAxios() ;
  const {currentUser} = use(AuthContext) ;

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async()=>{
        const {data} = await axiosSecure(`/get-user-dashboard-data?email=${currentUser?.email}`) ;
        return data ;
    }
  });

  if (isLoading) return <Loading/>
  if (error) return <Error message={error.message}/>

  const stats = [
    {
      title: 'Total Bought Properties',
      value: dashboardData?.stats?.totalBought,
      icon: <FaShoppingCart className="text-2xl" color='green' />,
      color: 'bg-gray-100 border-t-4 border-green-600 font-semibold'
    },
    {
      title: 'Total Bought Amount',
      value: `৳ ${dashboardData?.stats?.totalBoughtAmount.toLocaleString()}`,
      icon: <FaDollarSign className="text-2xl" color='red' />,
      color: 'bg-gray-100 border-t-4 border-red-600 font-semibold'
    },
    {
      title: 'Total Wishlist',
      value: dashboardData?.stats?.totalWishlist,
      icon: <FaHeart className="text-2xl" color='orange'/>,
      color: 'bg-gray-100 border-t-4 border-yellow-400 font-semibold'
    },
    {
      title: 'Total Rejected',
      value: dashboardData?.stats?.totalRejected,
      icon: <FaTimesCircle className="text-2xl" />,
      color: 'bg-gray-100 border-t-4 border-[#03373D] font-semibold'
    }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`card ${stat.color} shadow rounded-2xl`}>
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
                      <span className={`text-white font-semibold badge ${item.status === 'rejected' ? 'bg-red-600' : 'bg-green-600'}`}>
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