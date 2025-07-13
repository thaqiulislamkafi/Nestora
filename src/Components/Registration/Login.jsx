import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
// import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import { auth } from '../Firebase/authentication';
import useAxios from '../Hooks/useAxios';
import { Typewriter } from 'react-simple-typewriter';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';


    const { register, handleSubmit, formState: { errors } } = useForm();
    const provider = new GoogleAuthProvider();
    const axiosSecure = useAxios();


    const onSubmit = (data) => {
        console.log(data)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate(from, { replace: true })

            })
            .catch(error => console.log(error))
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
                navigate(from, { replace: true })

            })
            .catch(error => console.log(error))
    }

    return (
        <div className="min-h-screen p-14 flex items-center justify-center  inter-font">
            <div className="w-full  overflow-hidden shadow-xs">

                <div className="flex flex-col lg:flex-row border border-amber-100 rounded-4xl ">
                    {/* Login Form Section */}
                    <div className='w-full lg:w-1/2 p-8 lg:p-12  flex justify-center lg:py-16 '>
                        <div className="w-4/6 ">
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-600 mb-8">Log in to your account to continue</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
                                {/* Email Field */}
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

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">

                                    <div className="text-sm">
                                        <Link className="font-semibold text-gray-600 link">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                {/* Login Button */}

                                <button className="btn w-full bg-[#fceb00]"
                                > Sign in </button>

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
                                <button type="button" onClick={handleGoogleSignin} className="btn w-full"> <FcGoogle size={16} /> Sign in with Google </button>
                            </div>

                            {/* Register Link */}
                            <div className="mt-2 text-center text-sm">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to={'/signup'} className="font-semibold text-[#fceb00]">
                                        Register now
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

export default Login;