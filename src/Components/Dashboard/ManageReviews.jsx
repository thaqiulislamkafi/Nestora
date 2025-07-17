import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUserCircle, FaTrashAlt, FaStar } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';

const ManageReviews = () => {
  const axiosSecure = useAxios();

  const queryClient = useQueryClient() ;

  const { data: reviews , error, isLoading } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    },
  });

  const { mutateAsync: deleteReview } = useMutation({
    mutationFn: async ({id}) => {
      const res = await axiosSecure.delete(`/review/${id}`);
      return res.data;
    },
    onSuccess: () => {  
        queryClient.invalidateQueries(['reviews'])
        Swal.fire('Deleted!', 'Review has been deleted.', 'success');  
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete the review.', 'error');
    }
  });

  const handleDelete = async (id, reviewerEmail, propertyId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review permanently?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fceb00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
        await deleteReview({ id, reviewerEmail, propertyId });
    }
  };

  if (isLoading) return <Loading/> ;
  if(error) return <Error message={error.message} />

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-gray-900 inter-font">All User Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-2xl shadow-xs border-l border-[#fceb00] hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {review.reviewerImage ? (
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-300 mr-3" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
                    <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
                  </div>
                </div>
              </div>

              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>

              <p className="text-gray-600 italic mb-4">{review.description}</p>

              <div className='flex items-center justify-between'>
              <div className="flex items-center text-sm text-gray-500">
                <GiModernCity className="mr-2" />
                <span>{review.propertyTitle}</span>
              </div>
              <button
                  className="btn btn-sm p-2 rounded-full"
                  onClick={() => handleDelete(review._id, review.reviewerEmail, review.propertyId)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
