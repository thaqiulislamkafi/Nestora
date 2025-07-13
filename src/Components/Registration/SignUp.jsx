import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { auth } from '../Firebase/authentication';
import useAxios from '../Hooks/useAxios';


const Registration = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const provider = new GoogleAuthProvider();
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState();

    const axiosSecure = useAxios();

    const handleImageChange = (e) => {

        if (e.target.files[0]) {
            setImage(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    const uploadImage = async () => {

        if (!image) {
            return null;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=a2434256f4b2b19ae95982c11d12f6e8`, formData)

            setImageURL(response.data.data.url)
        }
        catch (error) {
            console.log(error)
        }

    }


    const onSubmit = async (data) => {
        // console.log(data)

        try {

            uploadImage();
            const user = await createUserWithEmailAndPassword(
                auth, data.email, data.password
            )
            if (user?.user) {

                console.log(imageURL)
                updateProfile(user.user, {
                    displayName: data.name,
                    photoURL: imageURL
                })

                const userData = {
                    userEmail: data.email,
                    userPhoto: imageURL,
                    userName: data.name || '',
                    role: 'user',
                    created_at: new Date().toISOString().split('T')[0],
                }
                console.log(userData)
                axiosSecure.post('/users', userData)
                    .then((res) => {
                        if (res.data.insertedId) {
                            console.log('User data post on Database')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                Swal.fire({
                    title: "Welcome!",
                    text: "User Successfully Created",
                    icon: "success"
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleGoogleSignin = () => {

        signInWithPopup(auth, provider)
            .then((res) => {

                const userData = {
                    userEmail: res.user.email,
                    userPhoto: res.user.photoURL,
                    userName: res.user.displayName || '',
                    role: 'user',
                    created_at: new Date().toISOString().split('T')[0],
                }

                axiosSecure.post('/users', userData)
                    .then((res) => {
                        if (res.data.insertedId) {
                            console.log('User data post on Database')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                Swal.fire({
                    title: "Congrats!",
                    text: "Users Sucessfully Logged in!",
                    icon: "success"
                });


            })
            .catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen p-14 flex items-center justify-center  inter-font">
            <div className="w-full  overflow-hidden shadow-xs">

                <div className="flex flex-col lg:flex-row border border-amber-100 rounded-4xl ">
                    {/* Registration Form Section */}
                    <div className='w-full lg:w-1/2 p-8 lg:p-12  flex justify-center lg:py-16'>
                        <div className="w-4/6 ">
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Create An Account</h2>
                            <p className="text-gray-600 mb-8">Register with Nestora</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">

                                <label className=" ">
                                    <input type="file" onChange={handleImageChange} accept="image/*" className="hidden w-fit"
                                    />
                                    <div className="w-fit my-2 cursor-pointer">
                                        {image ? (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Preview"
                                                className="w-12 h-auto object-cover"
                                            />
                                        ) : (
                                            <img
                                                src="https://i.postimg.cc/RFccJytY/image-upload-icon.png"
                                                alt="Upload"
                                                className="w-12 h-auto"
                                            />
                                        )}
                                    </div>
                                </label>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                                        Name
                                    </label>
                                    <div className="">
                                        <input type="text"
                                            {...register('name', { required: true })}
                                            className="input w-full font-semibold" placeholder="Your Name" />
                                        {errors.name?.type === 'required' && <p className='Error'>Name is required</p>}
                                    </div>

                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                                        Email
                                    </label>
                                    <div className="">
                                        <input type="email"
                                            {...register('email', { required: true })}
                                            className="input w-full font-semibold" placeholder="you@example.com" />
                                        {errors.email?.type === 'required' && <p className='Error'>Email is required</p>}
                                    </div>

                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                                        Password
                                    </label>
                                    <div className="">
                                        <input type="password"
                                            {...register('password', { required: true, minLength: 6 })}
                                            className="input font-semibold w-full" placeholder="password "
                                        />
                                        {errors.password?.type === 'required' && <p className='Error'>Password is required</p>}

                                        {errors.password?.type === 'minLength' && <p className='Error'> Password will be at least 6 Characters </p>}
                                    </div>
                                </div>



                                {/* Registration Button */}

                                <button className="btn w-full bg-[#fceb00] my-2"
                                >Register </button>

                            </form>

                            {/* Divider */}
                            <div className="my-4">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">OR</span>
                                    </div>
                                </div>
                            </div>

                            {/* Google Sign In */}
                            <div className="mt-2">
                                <button type="button" onClick={handleGoogleSignin} className="btn w-full"> <FcGoogle size={16} /> Register with Google </button>
                            </div>

                            {/* Register Link */}
                            <div className="mt-2 text-center text-sm">
                                <p className="text-gray-600">
                                    Do you have an account?{' '}
                                    <Link to={'/login'} className="font-semibold text-[#fceb00]">
                                        Login now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Animation/Illustration Section */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#fceb00] to-[#e6d706]  items-center rounded-l-[150px] justify-center">


                        <div><img className='min-w-140' src="https://i.postimg.cc/k4qyxLFw/login-2.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;