import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const bangladeshData = {
  Dhaka: ["Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Tangail", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Rajshahi: ["Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj"],
  Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

const UpdateProfile = ({ userData ,isOpen,setIsOpen}) => {

  const axiosSecure = useAxios();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      userName: userData?.userName || "",
      age: userData?.age || "",
      userEmail: userData?.userEmail || "",
      division: userData?.division || "",
      district: userData?.district || "",
      nid: userData?.nid || "",
      contact: userData?.contact || "",
    }
  });

  const selectedDivision = watch("division", userData?.division || "");
  const queryClient = useQueryClient() ;

  const {mutate} = useMutation({
    mutationFn : async(updatedData)=>{
      const {data} = await axiosSecure.patch(`/update-profile?email=${userData?.userEmail}`,updatedData) ;
      return data ;
    },
    onSuccess : ()=>{
      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile information has been successfully updated.",
        icon: "success",
        confirmButtonColor: "#CAEB66",
      });
      setIsOpen(false) ;
      queryClient.invalidateQueries(['user']) ;
    },
    onError : ()=>{
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating profile.",
        icon: "error",
      });
      setIsOpen(false) ;

    }
  })

  const onSubmit = async (data) => {
    mutate(data) ;
    console.log(data) ;
  };

  return (
    <div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-3xl bg-opacity-60 overflow-x-auto ">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative ">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            {/* Title */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
                Update Profile
              </h1>
              <p className="text-gray-600 mt-3">
                Keep your personal information up to date for a smoother experience.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
                
                {/* Name */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">Your Name</span></label>
                  <div className="relative">
                    <FaUser className="absolute inset-y-0 top-2.5 z-10  left-3 text-gray-400 flex items-center" />
                    <input
                      type="text"
                      {...register("userName", { required: "Name is required" })}
                      placeholder="Your Name"
                      className="input input-bordered w-full pl-10 rounded-md"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
        

                {/* Age */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">Your Age</span></label>
                  <input
                    type="number"
                    {...register("age", { required: "Age is required", min: { value: 18, message: "Must be at least 18" } })}
                    placeholder="25"
                    className="input input-bordered w-full rounded-md"
                  />
                  {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                {/* Email */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">Your Email</span></label>
                  <div className="relative">
                    <FaEnvelope className="absolute inset-y-0 top-2.5 z-10 left-3 text-gray-400 flex items-center" />
                    <input
                      type="email"
                      {...register("userEmail", { required: "Email is required" })}
                      placeholder="yourname@example.com"
                      className="input input-bordered w-full pl-10 rounded-md"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Division */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">Division</span></label>
                  <select
                    {...register("division", { required: "Division is required" })}
                    className="select select-bordered w-full rounded-md"
                  >
                    <option value="">Select Division</option>
                    {Object.keys(bangladeshData).map((division) => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>
                  {errors.division && <p className="text-red-500 text-sm">{errors.division.message}</p>}
                </div>

                {/* District */}
                <div className="form-control space-y-2 lg:col-span-2">
                  <label className="label"><span className="label-text font-semibold">District</span></label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute inset-y-0 top-2.5 z-10 left-3 text-gray-400 flex items-center" />
                    <select
                      {...register("district", { required: "District is required" })}
                      className="select select-bordered w-full pl-10 rounded-md"
                      disabled={!selectedDivision}
                    >
                      <option value="">Select District</option>
                      {selectedDivision &&
                        bangladeshData[selectedDivision]?.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                  </div>
                  {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                </div>

                {/* NID */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">NID No.</span></label>
                  <div className="relative">
                    <FaIdCard className="absolute inset-y-0 top-2.5 z-10 left-3 text-gray-400 flex items-center" />
                    <input
                      type="text"
                      {...register("nid", { required: "NID is required" })}
                      placeholder="1234567890"
                      className="input input-bordered w-full pl-10 rounded-md"
                    />
                  </div>
                  {errors.nid && <p className="text-red-500 text-sm">{errors.nid.message}</p>}
                </div>

                {/* Contact */}
                <div className="form-control space-y-2">
                  <label className="label"><span className="label-text font-semibold">Contact No.</span></label>
                  <div className="relative">
                    <FaPhone className="absolute inset-y-0 top-2.5 z-10 left-3 text-gray-400 flex items-center" />
                    <input
                      type="tel"
                      {...register("contact", { required: "Contact is required" })}
                      placeholder="01XXXXXXXXX"
                      className="input input-bordered w-full pl-10 rounded-md"
                    />
                  </div>
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="btn w-full bg-[#fceb00] hover:bg-[#fce300] text-gray-900 font-bold "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
