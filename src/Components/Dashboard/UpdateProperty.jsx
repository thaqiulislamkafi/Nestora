import { use, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaHome,
    FaMapMarkerAlt, FaDollarSign, FaArrowLeft, FaUpload
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const PropertyUpdateForm = () => {

    const { propertyId } = useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { currentUser } = use(AuthContext);

    const axiosSecure = useAxios();
    const [isUploading,setIsUploading] = useState(false) ;



    const { data, isLoading, error } = useQuery({
        queryKey: ['property', propertyId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/propertyDetails/${propertyId}`);
            return data;
        },
        enabled: !!propertyId,
    });

    const property = data?.result || '' ;

    const [imageUrl, setImageUrl] = useState(property.image);


    const { register, handleSubmit, formState: { errors, } } = useForm();


    const { mutate: updateProperty, isPending: isUpdating } = useMutation({
        mutationFn: async (updatedData) => {
            const { data } = await axiosSecure.patch(
                `/updateProperty/${propertyId}`,
                updatedData
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['property', propertyId]);
            Swal.fire({
                icon: 'success', title: 'Success!', text: 'Property updated successfully', showConfirmButton: false, timer: 1500
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error', title: 'Error', text: error.response?.data?.message || 'Failed to update property', showConfirmButton: false, timer: 1500
            });
        }
    });



    const handleImageUpload = async (e) => {

        setIsUploading(true);
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;


        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_REACT_APP_IMGBB_KEY}`,
                formData
            );
            setImageUrl(response.data.data.url);
            setIsUploading(false) ;

        } catch (error) {
            console.error('Image upload failed:', error);

        }
    };

    const onSubmit = (data) => {
        

        const updatedProperty = {
            ...data,
            image : imageUrl
        }
       updateProperty(updatedProperty);
    };

    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message} />;
    if (!property) return <Error message="Property not found" />;

    return (
        <div className="w-4/5 mx-auto py-6">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost mb-4 flex items-center"
                disabled={isUpdating}
            >
                <FaArrowLeft className="mr-2" /> Back to Properties
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Update Property</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaHome className="mr-2" /> Property Image
                                </span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div className="relative">
                                    <img
                                        src={imageUrl||property.image}
                                        alt="Property preview"
                                        className="w-full h-48 object-cover rounded-lg border"
                                    />

                                </div>
                                <div>
                                    <label className="btn btn-outline cursor-pointer">
                                        <FaUpload className="mr-2" />
                                        {isUploading && <>uploading..</>}
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                        />
                                    </label>
                                    <input type="hidden"  />
                                    
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center">
                                        <FaHome className="mr-2" /> Property Title
                                    </span>
                                </label>
                                <input
                                    type="text" defaultValue={property.title}
                                    {...register('title', {
                                        required: 'Title is required',
                                        minLength: {
                                            value: 5,
                                            message: 'Title must be at least 5 characters'
                                        }
                                    })}

                                    className={`input rounded-3xl input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                                    disabled={isUpdating}
                                />
                                {errors.title && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-600">{errors.title.message}</span>
                                    </label>
                                )}
                            </div>

                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center">
                                        <FaMapMarkerAlt className="mr-2" /> Location
                                    </span>
                                </label>
                                <input
                                    type="text" defaultValue={property?.location}
                                    {...register('location', {
                                        required: 'Location is required',
                                    })}
                                    className={`input rounded-3xl input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                                    disabled={isUpdating}
                                />
                                {errors.location && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-600">{errors.location.message}</span>
                                    </label>
                                )}
                            </div>

                            
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text flex items-center">
                                        <FaDollarSign className="mr-2" /> Price Range
                                    </span>
                                </label>
                                <input
                                    type="text" defaultValue={property?.priceRange}
                                    {...register('priceRange', {
                                        required: 'Price range is required',
                                    })}
                                    className={`input rounded-3xl input-bordered w-full ${errors.required ? 'input-error' : ''}`}
                                    disabled={isUpdating}
                                    placeholder="Example: ৳ 80,00,000 – ৳ 90,00,000"
                                />
                                {errors.required && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-600">{errors.required}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text my-2">Agent Information</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="rounded-full">
                                    <div className="w-12 rounded-full">
                                        <img className='rounded-full' src={property.
                                            agentImage || ''} alt="Agent" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">{property.agentName}</p>
                                    <p className="text-sm text-gray-500">{property.agentEmail}</p>
                                </div>
                            </div>
                        </div>

        
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">

                            <button
                                type="submit"
                                className="btn btn-primary flex-grow sm:flex-grow-0"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <span className="flex items-center">
                                        <span className="loading loading-spinner mr-2"></span>
                                        Updating...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <FaEdit className="mr-2" /> Update Property
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PropertyUpdateForm;