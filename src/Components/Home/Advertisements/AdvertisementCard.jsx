import { FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const AdvertisementCard = ({ ad }) => {
  return (
    <Fade cascade damping={0.1} triggerOnce>
      <div className="shadow-xs border-l border-[#fceb00] shadow-[#fceb00] rounded-xl overflow-hidden  hover:shadow-md transition-shadow duration-300 inter-font md:p-6">
        {/* Property Image */}
        <div className="relative h-48 overflow-hidden rounded-xl">
          <img 
            src={ad.image} 
            alt={ad.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {ad.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{ad.title}</h3>
            {ad.verified && (
              <FaCheckCircle className="text-blue-500 text-lg" title="Verified Property" />
            )}
          </div>

            <div className="flex items-center text-gray-600 mb-2 text-[[#fceb00]">
            <FaMapMarkerAlt className="mr-1 text-sm" />
            <span className="text-sm">{ad.location}</span>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold">{ad.priceRange}</p>
          </div>

          <button className='btn btn-sm rounded-2xl'>View Details</button>

          {/* Agent Info */}

        </div>
      </div>
    </Fade>
  );
};

export default AdvertisementCard;