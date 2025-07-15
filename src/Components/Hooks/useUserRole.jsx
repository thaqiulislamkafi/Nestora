import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import useAxios from './useAxios';
import { AuthContext } from '../Provider/AuthProvider';


const UseUserRole = () => {

    const {currentUser} = use(AuthContext) ;
    const axiosSecure = useAxios() ;

    const { data, isLoading, error } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/${currentUser.email}/Role`);
            return response.data;
        },
    });

    
    return {
        role: data?.role || null,
        isLoading,
        error
    };
};

export default UseUserRole;