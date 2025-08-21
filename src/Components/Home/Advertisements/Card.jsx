import { FaCheckCircle,FaPhone,FaEnvelope, FaMapMarkerAlt, FaRegUserCircle} from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router';

  // Author : Thaqi Ul Islam Kafi
  // Description : Purpose of this component
  // Date : 2025-08-20

  
const Card = ({ value, title }) => {
  const ad = value;
  
  return (
    <Fade cascade damping={0.1} triggerOnce>
      <div className="shadow-xs border-l border-[#fceb00]  shadow-[#fceb00] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 inter-font md:p-6 dark:border-sky-500  dark:shadow-sky-500  dark:bg-gray-800  dark:text-gray-200">

        {/* Property Image */}
        <div className="relative h-48 overflow-hidden rounded-xl">
          <img src={ad.image} alt={ad.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {ad.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 dark:bg-sky-600 text-white px-2 py-1 rounded text-xs font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex gap-1.5 items-center mb-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
              {ad.title}
            </h3>
            {ad.verified && (
              <FaCheckCircle className="text-blue-500 dark:text-sky-400 text-lg" title="Verified Property" />
            )}
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 my-2">
            <FaMapMarkerAlt className="mr-1 text-sm" />
            <span className="text-sm">{ad.location}</span>
          </div>

          {title === 'Properties' && (
            <div className="flex items-center gap-2 my-1 text-gray-600 dark:text-gray-400">
              <img src={ad.agentImage} alt="" className="w-4 rounded-full" />
              <div className="inter-font text-sm">{ad.agentName}(Agent)</div>
            </div>
          )}

          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 font-semibold">{ad.priceRange}</p>
          </div>

          <Link
            to={`/propertyDetails/${ad._id}`}
            className="btn btn-sm rounded-2xl bg-transparent dark:bg-sky-600 dark:hover:bg-sky-500 dark:text-white border-none"
          >
            View Details
          </Link>
        </div>
      </div>
    </Fade>
  );
};

export default Card;

// The Sentinal Times – Newspaper Website [ Github ] | [ Website ]
// The Sentinal Times is a dynamic online newspaper platiorm featuring role-based authentication, premium subscriptions with
// Stripe payments, and comprehensive article management for publishers and readers.
// Tools: Tailwind CSS, React, Nodejs, Express Js, MongoDB, Firebase, JWT
// • Premium content and unlimited publishing are offered to subscribers through a Stripe-integrated system.
// • A separate management system handles user privileges and trending articles.
// • Role-Based Authentication Different access levels for Admin, Publisher, and regular users