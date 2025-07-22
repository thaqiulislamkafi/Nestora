import React, { use } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../SharedElement/Loading';
import {  getIdToken } from 'firebase/auth';
import { auth } from '../Firebase/authentication';



export const axiosSecure = axios.create({
    baseURL : `http://localhost:5000`
})

// export const axiosSecure = axios.create({
//     baseURL : `https://assignment-12serversite.vercel.app`, 
// })

const useAxios = ()=>{

    const { currentUser, loading } = use(AuthContext);
    const navigate = useNavigate();

    if (loading)
        return <Loading />

    axiosSecure.interceptors.request.use(
        async (config) => {
          const user = auth?.currentUser;
          if (user) {
            const token = await getIdToken(user); 
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/unauthorized');
        }
        else if (status === 401) {
            navigate('/login')
        }

        return Promise.reject(error);
    })

    return axiosSecure ;
};

export default useAxios ;