import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import { useNavigate } from 'react-router';
import { FaCheckCircle, FaMapMarkerAlt, FaRegUserCircle, FaMoneyBillWave } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import Error from '../Error/Error';

const PropertyBought = () => {
  const { currentUser } = use(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: wishlist = [], isLoading, error } = useQuery({
    queryKey: ['wishlist', currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/getBoughtProperty?email=${currentUser?.email}`);
      return data;
    },
    enabled: !!currentUser?.email
  });

  const handlePay = (property) => {
    navigate(`/dashboard/payment/${property._id}`, {
      state: { property }
    });
  };

  if (isLoading) return <Loading />;

  if (error) return <Error />

  return (
    <div className="w-4/5 mx-auto py-6">
      <h1 className="text-xl lg:text-3xl text-center font-bold mb-3">Property Bought</h1>
      <p className='max-w-lg text-center mx-auto mb-8'>Here are the properties you've made offers for. Track their status and complete your payment when accepted.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((property, index) => (
          <Fade key={index} cascade damping={0.9} triggerOnce>
            <div className="shadow-xs border-l border-[#fceb00] shadow-[#fceb00] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 inter-font">
              <div className="relative h-40 overflow-hidden rounded-t-xl">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <div className="flex gap-1.5 items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{property.title}</h3>
                  <FaCheckCircle className="text-blue-500 text-md" title="Verified Property" />
                </div>

                <div className="flex items-center text-gray-600 my-1">
                  <FaMapMarkerAlt className="mr-1 text-xs" />
                  <span className="text-xs">{property.location}</span>
                </div>

                <div className="flex items-center gap-2 my-1 text-gray-600">
                  <FaRegUserCircle className="text-sm" />
                  <span className="inter-font text-xs">{property.agentName} (Agent)</span>
                </div>

                <div className="my-2 text-sm font-medium text-gray-700">
                  Offered Amount: ৳{property.offerAmount?.toLocaleString()}
                </div>

                <div className='flex items-center gap-2 '>

                  <div className=" text-sm font-semibold">
                    Status: <span className={
                      property.status === 'accepted' ? 'text-green-600' :
                        property.status === 'pending' ? 'text-yellow-500' :
                          'text-blue-600'
                    }>
                      {property.status}
                    </span>
                  </div>

                  {property.status === 'accepted' && (
                    <button
                      className="btn btn-xs bg-green-500 text-white  hover:bg-green-600"
                      onClick={() => handlePay(property)}
                    >
                      <FaMoneyBillWave className='' />Pay Now
                    </button>
                  )}
                </div>

                {property?.status === 'bought' && property?.transactionId && (
                  <div className="text-sm mt-2 text-green-700 ">
                    <span className="font-medium ">Transaction ID:</span> {property.transactionId}
                  </div>
                )}

              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;