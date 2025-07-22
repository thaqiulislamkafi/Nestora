import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bounce } from 'react-awesome-reveal';
import { FaQuoteLeft, FaRegClock, FaStar, FaTrash, FaUserCircle } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import useAxios from '../Hooks/useAxios';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../SharedElement/Loading';

const MyReviews = () => {
    const axiosSecure = useAxios();
    const { currentUser } = use(AuthContext);
    const queryClient = useQueryClient();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['myReviews', currentUser?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${currentUser?.email}`);
            return res.data;
        },
        enabled: !!currentUser?.email
    });


    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/review/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myReviews']);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Review has been removed.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this review?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fceb00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <Loading/> ;

    return (
        <Bounce cascade damping={0.09} triggerOnce>
            <div className="py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl lg:text-3xl font-bold text-center mb-8 text-gray-900 inter-font">
                        My Reviews
                    </h2>

                    {reviews.length === 0 ? (
                        <div className="text-center text-gray-500">You haven’t written any reviews yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="bg-white mx-4 p-6 rounded-2xl shadow-xs w-full flex-shrink-0 border-l border-[#fceb00] hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex items-center mb-4 justify-between">
                                        <div className="flex items-center">
                                            {review.reviewerImage ? (
                                                <img
                                                    src={review.reviewerImage}
                                                    alt={review.reviewerName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <FaUserCircle className="text-5xl text-gray-300" />
                                            )}
                                            <div className="ml-3">
                                                <h3 className="font-semibold text-gray-900">
                                                    {review.reviewerName}
                                                </h3>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`text-sm ${i < review.rating
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="text-[#fceb00] hover:text-[#f8fc00] btn btn-xs rounded-full p-1.5"
                                            title="Delete Review"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <FaQuoteLeft className="text-gray-300 text-xl mb-2" />
                                        <p className="text-gray-600 italic">{review.description}</p>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <div className="flex items-center mb-1">
                                            <GiModernCity className="mr-2" />
                                            <span>{review.propertyTitle}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <FaRegClock className="mr-2" />
                                            <span>
                                        
                                                {new Date(review.reviewTime).toISOString().split('T')[0]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Bounce>
    );
};

export default MyReviews;
