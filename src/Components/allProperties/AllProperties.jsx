import React, { useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedElement/Loading';
import Error from '../SharedElement/Error';
import { Bounce, Slide } from 'react-awesome-reveal';
import Card from '../Home/Advertisements/Card';


const AllProperties = () => {

    const [search, setSearch] = useState(null);
    const axiosSecure = useAxios() ;

    const { data: properties = [], isLoading, error } = useQuery({
        queryKey : ['properties',search],
        queryFn : async ()=> {
            const res = await axiosSecure(`/properties?search=${search}`);
            return res.data
        }
    })

    // if (isLoading)  return <Loading/>
    if (error)  return <Error message={error.message}/>

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Slide direction="down" triggerOnce>
                    <div className="text-center mb-12 inter-font">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">All Properties</h2>
                        <p className="text-gray-600 max-w-2xl lg:text-lg mx-auto">
                            Discover our all popular properties in prime locations
                        </p>
                    </div>

                    <div className='text-center my-5'>
                    <input type="text" placeholder="Search By Location" className="input " onChange={(e) => setSearch(e.target.value)} />
                </div>
                </Slide>

                <Bounce cascade damping={0.05} triggerOnce>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties?.map((property) => (
                            <Card key={property._id} value={property} title={'Properties'} />
                        ))}
                    </div>
                </Bounce>
            </div>
        </section>
    );
};

export default AllProperties;