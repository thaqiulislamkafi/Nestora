import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../Hooks/useAxios';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { useParams } from 'react-router';

const PropertyDetails = () => {

    const axiosSecure = useAxios();
    const {propertyId} = useParams()

    const { data: property, isLoading, error } = useQuery({
        queryKey : ['property'],
        queryFn : async()=>{
            const res = await axiosSecure(`/propertyDetails/${propertyId}`);
            return res.data ;
        }
    })

    if(isLoading)
        return <Loading/>

    if(error)
        return <Error message={error.message}/>

    return (
        <div>
            
        </div>
    );
};

export default PropertyDetails;