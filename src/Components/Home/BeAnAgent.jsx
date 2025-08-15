import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';


const bangladeshData = {
  Dhaka: [
    'Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'
  ],
  Chattogram: [
    'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', 'Cox\'s Bazar', 'Cumilla', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati'
  ],
  Sylhet: [
    'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'
  ],
  Khulna: [
    'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'
  ],
  Rajshahi: [
    'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Rajshahi', 'Sirajganj'
  ],
  Barishal: [
    'Barguna', 'Barishal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'
  ],
  Rangpur: [
    'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'
  ],
  Mymensingh: [
    'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur'
  ]
};

const BeAnAgent = () => {

  const axiosSecure = useAxios();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const selectedDivision = watch('division', '');

  const onSubmit = (data) => {
    const agentData = {
      ...data,
      status: 'pending',
      created_at: new Date().toISOString().split('T')[0]
    };

    axiosSecure.post('/agents', agentData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Be an Agent!',
            text: 'Your Request is Pending.',
            icon: 'success',
            confirmButtonColor: '#CAEB66'
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='py-20'>
      <div className="min-h-screen bg-white rounded-3xl inter-font">
        <div className="overflow-hidden px-6">
       
          <div className="mb-8">
            <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-800 mb-2">
              Be an Agent
            </h1>
            <p className="text-gray-600 lg:max-w-2xl my-6">
            Join our network and showcase prime properties in your area. Help clients find their dream homes while ensuring a smooth and reliable buying or selling experience
            </p>
          </div>

    
          <div className="divider my-12"></div>

       
          <div className="flex flex-col lg:flex-row gap-8">
      
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell us about yourself</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">Your Name</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 z-10 left-0 flex items-center pl-3 text-gray-400">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your Name"
                        className="input input-bordered w-full pl-10 rounded-md"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>

                  {/* Age */}
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">Your Age</span>
                    </label>
                    <input
                      type="number"
                      {...register('age', { required: 'Age is required', min: { value: 18, message: 'Must be at least 18' } })}
                      placeholder="25"
                      className="input input-bordered w-full rounded-md"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">Your Email</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 z-10 left-0 flex items-center pl-3 text-gray-400">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                        })}
                        placeholder="yourname@example.com"
                        className="input input-bordered w-full pl-10 rounded-md"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>

                  {/* Division */}
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">Division</span>
                    </label>
                    <select
                      {...register('division', { required: 'Division is required' })}
                      className="select select-bordered w-full rounded-md"
                    >
                      <option value="">Select Division</option>
                      {Object.keys(bangladeshData).map(division => (
                        <option key={division} value={division}>{division}</option>
                      ))}
                    </select>
                    {errors.division && <p className="text-red-500 text-sm">{errors.division.message}</p>}
                  </div>

                  {/* District */}
                  <div className="form-control space-y-2 lg:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">District</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 z-10 left-0 flex items-center pl-3 text-gray-400">
                        <FaMapMarkerAlt />
                      </span>
                      <select
                        {...register('district', { required: 'District is required' })}
                        className="select select-bordered w-full pl-10 rounded-md"
                        disabled={!selectedDivision}
                      >
                        <option value="">Select District</option>
                        {selectedDivision &&
                          bangladeshData[selectedDivision]?.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))
                        }
                      </select>
                    </div>
                    {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                  </div>

                  {/* NID */}
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">NID No.</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 z-10 left-0 flex items-center pl-3 text-gray-400">
                        <FaIdCard />
                      </span>
                      <input
                        type="text"
                        {...register('nid', { required: 'NID is required', pattern: { value: /^[0-9]{10,17}$/, message: 'NID must be 10-17 digits' } })}
                        placeholder="1234567890"
                        className="input input-bordered w-full pl-10 rounded-md"
                      />
                    </div>
                    {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
                  </div>

                  {/* Contact */}
                  <div className="form-control space-y-2">
                    <label className="label">
                      <span className="label-text font-semibold">Contact No.</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 z-10 left-0 flex items-center pl-3 text-gray-400">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        {...register('contact', { required: 'Contact is required', pattern: { value: /^[0-9]{11}$/, message: 'Must be 11 digits' } })}
                        placeholder="01XXXXXXXXX"
                        className="input input-bordered w-full pl-10 rounded-md"
                      />
                    </div>
                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button type="submit" className="btn w-full bg-[#fceb00] hover:bg-[#fce300] text-gray-900">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section */}
            <div className="hidden lg:block flex-1">
              <div className="h-full flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/KYfyzgcX/agent-pending.png"
                  alt="Agent application"
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeAnAgent;
