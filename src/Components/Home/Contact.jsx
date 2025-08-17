import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 inter-font mb-40">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Let’s Touch In
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
        Whether you're buying, selling, or just exploring your real estate
        options — our team is here to guide you every step of the way.
        <span className="font-semibold text-[#fceb00]"> Get in touch today!</span>
      </p>

      {/* Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-18">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">

          <div className="flex items-center space-x-6 shadow-sm p-6 rounded-xl hover:shadow-lg transition-all border-l border-[#fceb00] duration-500">
            <FaEnvelope className="text-gray-800 text-4xl" />
            <div>
              <p className="font-bold text-xl text-gray-800">Email</p>
              <p className="text-gray-600 text-lg">contact@realestate.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-6  shadow-sm p-6 rounded-xl hover:shadow-lg transition-all border-l border-[#fceb00] duration-500">
            <FaPhoneAlt className="text-green-600 text-4xl" />
            <div>
              <p className="font-bold text-xl text-gray-800">Phone</p>
              <p className="text-gray-600 text-lg">+880 123 456 789</p>
            </div>
          </div>

          <div className="flex items-center space-x-6  shadow-sm p-6 rounded-xl hover:shadow-lg transition-all border-l border-[#fceb00] duration-500">
            <FaMapMarkerAlt className="text-red-600 text-4xl" />
            <div>
              <p className="font-bold text-xl text-gray-800">Location</p>
              <p className="text-gray-600 text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="px-8 inter-font">
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full text-lg py-3 rounded-lg "
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full text-lg py-3 rounded-lg "
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full text-lg py-3 rounded-lg "
              rows={5}
            ></textarea>
            <button
              type="submit"
              className="btn bg-[#fceb00] w-full py-3 font-semibold rounded-lg "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
