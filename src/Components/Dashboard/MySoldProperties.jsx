import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Provider/AuthProvider';

const MySoldProperties = () => {

  const { currentUser } = use(AuthContext);
  const axiosSecure = useAxios();

  const { data: soldProperties, isLoading,error } = useQuery({
    queryKey: ['sold-properties', currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?email=${currentUser?.email}`);
      return res.data;
    },
    enabled: !! currentUser?.email
  });

  if (isLoading) return <Loading/> ;
  if(error) return <Error message={error.message}/>

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
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
