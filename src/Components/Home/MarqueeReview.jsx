import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Bounce } from 'react-awesome-reveal';
import Marquee from 'react-fast-marquee';
import { FaUserCircle, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { GiModernCity } from 'react-icons/gi';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';

const MarqueeReview = () => {

  const axiosSecure = useAxios() ;



  const { data : reviews, isLoading,error } =  useQuery({
    queryKey : ['reviews'],
    queryFn : async()=>{
        const res = await axiosSecure('/reviews') ;
        return res.data ;
    }
  })

  if(isLoading)
    return <Loading/> 

  if(error)
    return <Error message={error.message}/>

  return (
    <Bounce cascade damping={0.09} triggerOnce>
      <div className=" py-12 px-4 sm:px-6 lg:px-8 my-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center mb-3 text-gray-900 inter-font">What Our Clients Say</h2>
          <div className="w-50 h-1 bg-[#fceb00] mx-auto rounded-full my-2"></div>
          <Marquee
            speed={20}
            gradient={false}
            pauseOnHover={true}
            direction="left"
            className="py-4"
          >
            {reviews.map((review,index) => (
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
                    <h3 className="font-semibold text-gray-900">{index+1}. {review.reviewerName}</h3>
                    <div className="flex items-center">

                      {
                        [...Array(5)].map((k,i)=> (
                          <FaStar 
                          key={i} className={`text-sm ${i<review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
          </Marquee>
        </div>
      </div>
    </Bounce>

  );
};

export default MarqueeReview;