import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { useForm } from "react-hook-form";
import { FaHome, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { useParams } from "react-router";
import Loading from "../SharedElement/Loading";
import Error from "../SharedElement/Error";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";


const MakeOffer = () => {

    const { propertyId } = useParams();
    const axiosSecure = useAxios();
    const { currentUser } = use(AuthContext)
    const queryClient = useQueryClient();


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data, isLoading, error } = useQuery({
        queryKey: ['property', propertyId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/propertyDetails/${propertyId}`);
            return data;
        },
        enabled: !!propertyId
    });

    const { mutate: MakeOffer } = useMutation({
        mutationFn: async (updatedData) => {
            const { data } = await axiosSecure.patch(
                `/makeOffer/user?email=${currentUser.email}`,
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

    if (!data) return <Loading />;

    const property = data?.result || []

    const priceRange = property?.priceRange;

    

    const validateOfferAmount = (offerAmount) => {
        const [minPrice, maxPrice] = priceRange
          .replace(/৳/g, '')
          .replace(/,/g, '')
          .split(/–|-/)
          .map(price => parseInt(price.trim()));
      
        if (offerAmount < minPrice || offerAmount > maxPrice) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Offer Amount',
            text: `Your offer must be between ৳${minPrice.toLocaleString()} and ৳${maxPrice.toLocaleString()}.`,
          });
          return false;
        }
      
        return true;
      };

    
    const onSubmit = (data) => {

        if(!(validateOfferAmount(data.offerAmount)))
            return 

        const updatedData = {
            propertyTitle : property.title,
            propertyId : propertyId,
            agentName : property.agentName ,
            agentEmail : property.agentEmail,
            location : property.location ,
            offerAmount : data.offerAmount,
            status : 'pending'
        }
        MakeOffer(updatedData) ;
    };

    if (isLoading)
        return <Loading />

    if (error) {
        return <Error message={error.message} />
    }



    return (
        <div className="card w-full lg:max-w-xl bg-base-100 shadow-xl mx-auto">
            <div className="card-body ">
                <h2 className="card-title text-2xl font-bold my-4">Make an Offer</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    {/* Property Title (readonly) */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaHome className="mr-2" /> Property Title
                                </span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered rounded-3xl w-full"
                                value={property.title}
                            />
                        </div>

                        {/* Property Location (readonly) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> Property Location
                                </span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered rounded-3xl w-full"
                                value={property.location}
                            />
                        </div>

                        {/* Agent Name (readonly) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaUserTie className="mr-2" /> Agent Name
                                </span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered rounded-3xl w-full"
                                value={property.agentName}
                            />
                        </div>

                        {/* Buyer Email (readonly) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaEnvelope className="mr-2" /> Your Email
                                </span>
                            </label>
                            <input
                                type="email"
                                readOnly
                                className="input input-bordered rounded-3xl w-full"
                                value={currentUser.email}
                            />
                        </div>

                        {/* Buyer Name (readonly) */}
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaUser className="mr-2" /> Your Name
                                </span>
                            </label>
                            <input
                                type="text"
                                readOnly
                                className="input input-bordered rounded-3xl w-full"
                                value={currentUser.displayName}
                            />
                        </div>

                        {/* Offer Amount */}
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text">Offer Amount (৳)</span>
                                <span className="label-text-alt">
                                    Range: {property.priceRange}
                                </span>
                            </label>
                            <input
                                type="number"
                                className={`input input-bordered rounded-3xl  w-full ${errors.offerAmount ? "input-error" : ""}`}
                                {...register("offerAmount", {
                                    required: "Offer amount is required",
                                    valueAsNumber: true
                                })}
                                placeholder="Enter your offer amount"
                            />
                            {errors.offerAmount && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.offerAmount.message}
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Buying Date */}
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    <FaCalendarAlt className="mr-2" /> Expected Buying Date
                                </span>
                            </label>
                            <input
                                type="date"
                                className={`input input-bordered rounded-3xl w-full ${errors.buyingDate ? "input-error" : ""}`}
                                {...register("buyingDate", {
                                    required: "Buying date is required",
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        return selectedDate >= today || "Date must be in the future";
                                    }
                                })}
                            />
                            {errors.buyingDate && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.buyingDate.message}
                                    </span>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button type="submit" className="btn btn-primary">
                            Submit Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeOffer;