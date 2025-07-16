import { useQuery } from '@tanstack/react-query';
import { Fade } from 'react-awesome-reveal';
import { FaCheckCircle, FaMapMarkerAlt, FaRegUserCircle, FaTimes, FaHandshake } from 'react-icons/fa';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Wishlist = () => {

    const axiosSecure = useAxios();
    const { currentUser } = use(AuthContext);
    const navigate = useNavigate();

    const { data: wishlist, isLoading, refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {

            const { data } = await axiosSecure(`/wishlist?email=${currentUser?.email}`);
            return data;
        },

    });



    const handleReject = async (propertyId) => {
        console.log(propertyId)
        try {
            const { data } = await axiosSecure.delete(`/deleteWish?email=${currentUser?.email}`, { data: { propertyId } });

            if (data) {
                refetch();
                Swal.fire({
                    icon: 'success', title: 'Success!', text: 'Property Deleted successfully', showConfirmButton: false, timer: 1500
                });
            }

        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const handleMakeOffer = (propertyId) => {
        navigate(`/dashboard/makeOffer/${propertyId}`)
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!wishlist?.length) {
        return (
            <div className="text-center py-8 text-gray-500">
                Your wishlist is empty. Start saving properties you love!
            </div>
        );
    }

    return (
        <div className="w-4/5 mx-auto py-6">
            <h1 className="text-xl lg:text-3xl text-center font-bold mb-3">My Wishlist</h1>
            <p className='max-w-lg text-center mx-auto mb-8'>Track the properties that caught your eye.
                Your personalized wishlist is just a scroll away.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((property) => (
                    <Fade key={property._id} cascade damping={0.9} triggerOnce>
                        <div className="shadow-xs border-l border-[#fceb00] shadow-[#fceb00] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 inter-font">
                            {/* Property Image */}
                            <div className="relative h-40 overflow-hidden rounded-t-xl">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                                {property.featured && (
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Property Details */}
                            <div className="p-4">
                                <div className="flex gap-1.5 items-center mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{property.title}</h3>
                                    {property.verified && (
                                        <FaCheckCircle className="text-blue-500 text-md" title="Verified Property" />
                                    )}
                                </div>

                                <div className="flex items-center text-gray-600 my-1">
                                    <FaMapMarkerAlt className="mr-1 text-xs" />
                                    <span className="text-xs">{property.location}</span>
                                </div>

                                <div className="flex items-center gap-2 my-1 text-gray-600">
                                    <FaRegUserCircle className="text-sm" />
                                    <span className="inter-font text-xs">{property.agentName}(Agent)</span>
                                </div>

                                <div className="my-2">
                                    <p className="text-gray-700 font-semibold text-sm">{property.priceRange}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleReject(property._id)}
                                        className="btn btn-sm rounded-lg "
                                    >
                                        <FaTimes /> Reject
                                    </button>
                                    <button
                                        onClick={() => handleMakeOffer(property._id)}
                                        className="btn btn-sm   rounded-lg"
                                    >
                                        <FaHandshake /> Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;