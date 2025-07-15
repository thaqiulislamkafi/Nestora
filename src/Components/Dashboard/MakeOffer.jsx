import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { useForm } from "react-hook-form";
import { FaHome, FaMapMarkerAlt, FaUserTie, FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { useParams } from "react-router";
import Loading from "../SharedElement/Loading";
import Error from "../SharedElement/Error";
import useAxios from "../Hooks/useAxios";

const MakeOffer = () => {

    const { propertyId } = useParams();
    const axiosSecure = useAxios();
    console.log(propertyId)

    
    const { data, isLoading, error } = useQuery({
        queryKey: ['proper',propertyId],
        queryFn: async () => {
            console.log(propertyId) ;
            const res = await axiosSecure.get(`/propertyDetails/${propertyId}`);
            return res.data;
        },
        enabled : !!propertyId
        
    })
    console.log(data)

    const property = data?.result || []
    const { currentUser } = use(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            propertyTitle: property.title,
            propertyLocation: property.location,
            agentName: property.agentName,
            buyerEmail: currentUser.email,
            buyerName: currentUser.userName,
            offerAmount: "",
            buyingDate: ""
        }
    });

    const priceRange = property?.priceRange;

    const [minPrice, maxPrice] = priceRange
        .replace(/৳/g, '')
        .replace(/,/g, '')
        .split(/–|-/)
        .map(price => parseInt(price.trim()));

    const onSubmit = (data) => {
        console.log("Offer submitted:", data);
    };

    if (isLoading)
        return <Loading />

    if (error) {
        return <Error message={error.message} />
    }

    return (
        <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">Make an Offer</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Property Title (readonly) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center">
                                <FaHome className="mr-2" /> Property Title
                            </span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="input input-bordered w-full"
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
                            className="input input-bordered w-full"
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
                            className="input input-bordered w-full"
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
                            className="input input-bordered w-full"
                            value={currentUser.email}
                        />
                    </div>

                    {/* Buyer Name (readonly) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center">
                                <FaUser className="mr-2" /> Your Name
                            </span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="input input-bordered w-full"
                            value={currentUser.userName}
                        />
                    </div>

                    {/* Offer Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Offer Amount (৳)</span>
                            <span className="label-text-alt">
                                Range: {property.priceRange}
                            </span>
                        </label>
                        <input
                            type="number"
                            className={`input input-bordered w-full ${errors.offerAmount ? "input-error" : ""}`}
                            {...register("offerAmount", {
                                required: "Offer amount is required",
                                min: {
                                    value: minPrice,
                                    message: `Offer must be at least ৳${minPrice.toLocaleString()}`
                                },
                                max: {
                                    value: maxPrice,
                                    message: `Offer cannot exceed ৳${maxPrice.toLocaleString()}`
                                },
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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center">
                                <FaCalendarAlt className="mr-2" /> Expected Buying Date
                            </span>
                        </label>
                        <input
                            type="date"
                            className={`input input-bordered w-full ${errors.buyingDate ? "input-error" : ""}`}
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