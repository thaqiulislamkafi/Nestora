import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { Link, useParams } from 'react-router';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import UseUserRole from '../Hooks/useUserRole';


const PropertyDetails = () => {

    const axiosSecure = useAxios();
    const { propertyId } = useParams()
    const queryClient = useQueryClient();

    const { currentUser } = use(AuthContext);
    const { role } = UseUserRole();

    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const Nestora_Outlet = 'my-10 p-5 md:p-7 border-2 border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center gap-8 font-medium';

    const { data, isLoading, error } = useQuery({
        queryKey: ['property', propertyId],
        queryFn: async () => {
            const res = await axiosSecure(`/propertyDetails/${propertyId}`);
            return res.data;
        }
    })

    const isUser = () => role === 'user';

    const property = data?.result || []
    const reviews = data?.reviews || []

    const updated = {
        propertyId: propertyId,
        email: currentUser.email
    }

    const mutation = useMutation({
        mutationFn: async (updated) => {
            const result = await axiosSecure.post('/addwishlist', updated);
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
            Swal.fire({
                icon: 'success', title: 'Success!', text: 'Property wishlisted successfully', showConfirmButton: false, timer: 1500
            });
        }

    })

    const postMutation = useMutation({
        mutationFn: async (reviewData) => {
            const { data } = await axiosSecure.post('/postReview', reviewData)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews']);
            Swal.fire({
                icon: 'success', title: 'Success!', text: 'Posted Review Successfully', showConfirmButton: false, timer: 1500
            });
        }
    })

    const handleWishlist = () => {
        mutation.mutate(updated)
    }

    const onSubmit = async (data) => {
        setIsOpen(false)
        const reviewData = {

            reviewerName: currentUser.displayName,
            reviewerImage: currentUser.photoURL,
            reviewerEmail: currentUser.email,
            description: data.description,
            rating: 5,
            propertyTitle: property.title,
            propertyId: property._id,
            reviewTime: new Date().toISOString()
        };
        postMutation.mutate(reviewData);

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
                <p className='text-gray-800 my-2  md:text-lg  font-semibold'>Discover <span className='text-[#23BE0A]'>{property?.title}</span> with modern amenities and thoughtful design.
                    Located in <span className='text-[#23BE0A]'>{property?.location}</span>, offering both comfort and convenience.
                    An ideal choice for families and individuals seeking quality living</p>


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

                    <button disabled={!isUser()} onClick={handleWishlist} className='btn btn-sm btn-ghost border-amber-300 rounded-3xl my-2 Button'>Add to Whishlist</button>


                </div>
            </div>

            {isOpen && (
                <dialog id="review_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Your Review</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Reviewer Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={currentUser?.displayName}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100"
                                />
                            </div>

                            {/* Review Description */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Your Review</span>
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Write your review here..."
                                ></textarea>
                            </div>

                            <div className="modal-action flex justify-between items-center">
                                <button type="submit" className="btn bg-[#fceb00] rounded-xl">
                                    Submit
                                </button>
                                <button onClick={() => setIsOpen(false)} type="button" className="btn btn-ghost">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            {/* ..............Property Reviews Bar.............. */}

            <div className='border-2 border-gray-200 rounded-xl p-7 text-center my-20 mb-40'>
                <p className='poppins text-xl lg:text-3xl my-1 font-bold'>Reviews</p>
                <div className='border-t-2 border-dashed border-gray-200 my-6'></div>
                <div className='my-10 flex flex-col md:flex-row'>

                    {reviews.length === 0 && <>
                    
                    <p className='text-gray-800 font-semibold  text-center mx-auto md:text-lg'>There is no review of this <span className='text-[#23BE0A]'>{property.title}</span> property</p>
                    
                    </>
                    }

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

                <div onClick={() => setIsOpen(true)} className=' my-3 btn bg-[#fceb00] w-full rounded-4xl'>Add Review</div>
            </div>

        </div>

    );
};

export default PropertyDetails;