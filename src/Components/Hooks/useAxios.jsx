import axios from "axios";


export const axiosSecure = axios.create({
    baseURL : `http://localhost:5000`
})

// export const axiosSecure = axios.create({
//     baseURL : `https://assignment-12-server-site-two.vercel.app`
// })

const useAxios = ()=>{

    return axiosSecure ;
};

export default useAxios ;