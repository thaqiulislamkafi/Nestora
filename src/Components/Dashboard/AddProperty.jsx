import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUpload, FaSpinner, FaHome, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import Swal from 'sweetalert2';


const AddProperty = () => {

    const [imageUploading, setImageUploading] = useState(false);
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [formSubmitting, setFormSubmitting] = useState(false);

    const {currentUser} = use(AuthContext) ;
    const queryClient = useQueryClient() ;
    const axiosSecure = useAxios() ;


    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            title: '',
            location: '',
            priceRange: '',
            agentName: currentUser?.displayName || '',
            agentEmail: currentUser?.email || '',
        },
    });

    const mutation = useMutation({
        mutationFn : async(updated)=>{
            const result = await axiosSecure.post('/addProperty',updated);
            return result.data ;
        },
        onSuccess : ()=>{
            queryClient.invalidateQueries(['properties'])
            Swal.fire({
                title: "Good job!",
                text: "Property added!",
                icon: "success"
              });
        }
        
    })

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0]) ;
        console.log(file)
        if (!file) return;

        setImageUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_REACT_APP_IMGBB_KEY}`,
                formData
            );
            setImageUrl(response.data.data.url);

        } catch (error) {
            console.error('Image upload failed:', error);

        } finally {
            setImageUploading(false);
        }
    };

    const onSubmit = async (data) => {
        // if (!imageUrl) {
        //     return;
        // }

        console.log(data)

        setFormSubmitting(true);
        try {
            const propertyData = {
                ...data,
                image: imageUrl,
                agentImage: currentUser?.photoURL || '',
                verified: false
            };

            mutation.mutate(propertyData)
            setImageUrl('');
        } catch (error) {
            console.error('Error adding property:', error);

        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 flex items-center ">
                <FaHome className="mr-2" /> Add New Property
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                {/* Image Upload */}
                <div className="form-group">
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex justify-center">
                        Property Image
                    </label>
                    <div className="flex items-center justify-center">
                        <label className="flex flex-col items-center w-2/4 h-45 bg-white text-[#e6d70c] rounded-3xl border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 my-3">

                            
                                {
                                
                                (imageUrl ||image) ? (
                                    <div className="">
                                        <img
                                            src={imageUrl || URL.createObjectURL(image)}
                                            alt="Property preview"
                                            className="min-w-full object-cover h-45 rounded-3xl"
                                        />
                                    </div>
                                ) :

                                <>
                                 <FaUpload className="text-2xl mt-13 " />
                            <span className="mt-2 text-sm">
                                {imageUploading ? 'Uploading...' : 'Select Image'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={imageUploading}
                            />
                                </>
                                
                                }
                            
                           
                        </label>
                        
                    </div>
                    {imageUploading && (
                        <div className="flex items-center mt-2 text-gray-500">
                            <FaSpinner className="animate-spin mr-2" />
                            <span>Uploading image...</span>
                        </div>
                    )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3'>


                    {/* Property Title */}
                    <div className="form-group">
                        <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FaHome className="mr-2" /> Property Title
                        </label>
                        <input type="text" {...register('title', { required: 'Property title is required' })}
                            className={`w-full p-2 border rounded-3xl ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter property title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Property Location */}
                    <div className="form-group">
                        <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Property Location
                        </label>
                        <input type="text" {...register('location', { required: 'Location is required' })}
                            className={`w-full p-2 border rounded-3xl ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter property location"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                        )}
                    </div>


                    {/* Agent Name (readonly) */}
                    <div className="form-group">
                        <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FaUserTie className="mr-2" /> Agent Name
                        </label>
                        <input type="text" value={currentUser.displayName}
                            {...register('agentName')}
                            className="w-full p-2 border border-gray-300 rounded-3xl bg-gray-100"
                        />
                    </div>

                    {/* Agent Email (readonly) */}
                    <div className="form-group">
                        <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            <FaEnvelope className="mr-2" /> Agent Email
                        </label>
                        <input type="email" readOnly value={currentUser.email}
                            {...register('agentEmail')}
                            className="w-full p-2 border border-gray-300 rounded-3xl bg-gray-100"
                        />
                    </div>

                    {/* Price Range */}
                    <div className="form-group md:col-span-2">
                        <label className=" text-sm font-medium text-gray-700 mb-1">
                             ৳ Price Range
                        </label>
                        <input
                            type="text"
                            {...register('priceRange', { required: 'Price range is required' })}
                            className={`w-full p-2 border rounded-3xl ${errors.priceRange ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Example: ৳ 80,00,000 – ৳ 90,00,000"
                        />
                        {errors.priceRange && (
                            <p className="text-red-500 text-sm mt-1">{errors.priceRange.message}</p>
                        )}
                    </div>



                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={formSubmitting}
                        className={`w-full py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-[#e6d70c] hover:bg-[#e6d70cea] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {formSubmitting ? (
                            <span className="flex items-center justify-center">
                                <FaSpinner className="animate-spin mr-2" />
                                Adding Property...
                            </span>
                        ) : (
                            'Add Property'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;