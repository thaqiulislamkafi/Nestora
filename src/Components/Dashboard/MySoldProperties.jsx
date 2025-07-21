import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';
import { FaChartLine } from 'react-icons/fa';

const MySoldProperties = () => {

  const { currentUser } = use(AuthContext);
  const axiosSecure = useAxios();
  let total = 0 ;

  const { data: soldProperties, isLoading, error } = useQuery({
    queryKey: ['sold-properties', currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?email=${currentUser?.email}`);
      return res.data;
    },
    enabled: !!currentUser?.email
  });

  soldProperties?.forEach(Property => {
    
    const earning = Property.price * 0.05 ;
    total += earning;
  });  

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />

  return (
    <div className="overflow-x-auto p-5">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Daily Earnings */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-green-500 mr-2" />
            <h3 className="font-semibold">Totals Earnings</h3>
          </div>
          <p className="text-3xl font-bold">${total}</p>
          <p className="text-sm text-gray-500">From {soldProperties.length} deliveries</p>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-blue-500 mr-2" />
            <h3 className="font-semibold">This Month</h3>
          </div>
          <p className="text-3xl font-bold">${'0000'}</p>
          <p className="text-sm text-gray-500">From {''} deliveries</p>
        </div>

        {/* Yearly Earnings */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FaChartLine className="text-purple-500 mr-2" />
            <h3 className="font-semibold">This Year</h3>
          </div>
          <p className="text-3xl font-bold">${'0000'}</p>
          <p className="text-sm text-gray-500">From {''} deliveries</p>
        </div>
      </div>



      <h2 className="text-2xl font-bold my-7">My Sold Properties</h2>
      {soldProperties.length === 0 ? (
        <p>No sold properties found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-[#fceb00] text-gray-900 text-base">
            <tr>
              <th>#</th>
              <th>Property Title</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((item, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.title || ''}</td>
                <td>{item.location || ''}</td>
                <td>{item.buyerName}</td>
                <td>{item.buyerEmail}</td>
                <td>৳ {Number(item.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MySoldProperties;
