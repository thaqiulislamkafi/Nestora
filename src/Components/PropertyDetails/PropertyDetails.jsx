import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { Link, useParams } from 'react-router';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import { AuthContext } from '../Provider/AuthProvider';

const PropertyDetails = () => {

    const axiosSecure = useAxios();
    const { propertyId } = useParams()
    const queryClient = useQueryClient() ;
    const {currentUser} = use(AuthContext) ;

    const Nestora_Outlet = 'my-10 p-5 md:p-7 border-2 border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center gap-8 font-medium';

    const { data, isLoading, error } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosSecure(`/propertyDetails/${propertyId}`);
            return res.data;
        }
    })


    const property = data?.result || []
    const reviews = data?.reviews || []

    const updated = {
        propertyId : propertyId,
        email : currentUser.email
    }

    const mutation = useMutation({
        mutationFn : async(updated)=>{
            const result = await axiosSecure.post('/addwishlist',updated);
            return result.data ;
        },
        onSuccess : ()=>{
            queryClient.invalidateQueries(['wishlist'])
        }
        
    })

    const handleWishlist = ()=>{
        mutation.mutate(updated)
    }

    if (isLoading)
        return <Loading />

    if (error)
        return <Error message={error.message} />

    console.log(property);
    return (
        <div>
            <div className='bg-gray-100 text-center py-16 rounded-xl px-4 lg:px-16 dark:bg-gray-700'>
                <p className='text-3xl md:text-4xl my-3 poppins font-bold'>Property Details</p>
                <p className='text-gray-800 my-2 text-xs md:text-sm dark:text-gray-200'>Explore everything you need to know about this exciting Nestora! Get the full details on dates, venue, featured performers, and schedules. You can like a Nestora multiple times as your wish which is count as a rating of a Nestora.</p>


            </div>

            {/* ..............Nestora Bar.............. */}

            <div className={Nestora_Outlet}>

                <div className='bg-gray-200 lg:p-6 rounded-xl lg:w-[29.13vw] h-auto md:w-3/5'><img className='rounded-xl h-60 w-full' src={property.image} alt="" /></div>

                <div className='text text-gray-700 dark:text-gray-200'>

                    {/* <p className='text-[#176AE5] text-xs px-3 py-2 bg-[#1769e51c] rounded-2xl w-fit my-2 dark:text-gray-200'># {property.category} </p> */}

                    <p className='poppins my-2 text-xl lg:text-3xl font-bold'>{property?.title}</p>
                    <p className='flex flex-col gap-2 my-2 text-sm lg:text-xl'>
                        <span>Location : {property.location}</span>
                        <span>Verified : {`${property.verified}
                        `}</span>
                    </p>

                    <p className='font-medium my-2 text-sm lg:text-lg'>Agent Name : <span className='text-[#23BE0A] font-bold'>{property.
                        agentName}</span></p>
                    <p className='font-medium my-2 text-sm lg:text-lg'>Price Range : <span className='text-[#23BE0A] font-bold'>{property.priceRange}</span></p>

                    <button onClick={handleWishlist} className='btn btn-sm btn-ghost border-amber-300 rounded-3xl my-2 Button'>Add to Whishlist</button>


                </div>
            </div>

            {/* ..............Property Reviews Bar.............. */}

            <div className='border-2 border-gray-200 rounded-xl p-7 text-center my-20 mb-40'>
                <p className='poppins text-xl lg:text-3xl my-1 font-bold'>Reviews</p>
                <div className='border-t-2 border-dashed border-gray-200 my-6'></div>
                <div className='my-10'>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white mx-4 p-6 rounded-2xl shadow-xs w-80 flex-shrink-0 border-l border-[#fceb00] hover:shadow-lg transition-shadow  duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className="mr-4">
                                    {review.reviewerImage ? (
                                        <img
                                            src={review.reviewerImage}
                                            alt={review.reviewerName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-5xl text-gray-300" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
                                    <div className="flex items-center">
                                        {/* {[...Array(5)].map((_, i) => (
                                        <FaStar
                                          key={i}
                                          className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                      ))} */}

                                        {
                                            [...Array(5)].map((k, i) => (
                                                <FaStar
                                                    key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <FaQuoteLeft className="text-gray-300 text-xl mb-2" />
                                <p className="text-gray-600 italic">{review.description}</p>
                            </div>

                            <div className="flex items-center text-sm text-gray-500">
                                <GiModernCity className="mr-2" />
                                <span>{review.propertyTitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='border-t-2  border-gray-100 my-4'></div>
                
                <div  className=' my-3 btn bg-[#fceb00] w-full rounded-4xl'>Add Review</div>
            </div>

        </div>

    );
};

export default PropertyDetails;