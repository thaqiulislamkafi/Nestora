import { useQuery } from '@tanstack/react-query';
import { Bounce, Slide } from 'react-awesome-reveal';
// import { FaSpinner } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../SharedElement/Loading';
import Error from '../../SharedElement/Error';
import AdvertisementCard from './AdvertisementCard';

const AdvertisementSection = () => {

    const axiosSecure = useAxios() ;

    const { data: ads = [], isLoading, error } = useQuery({
        queryKey : ['advertisements'],
        queryFn : async ()=> {
            const res = await axiosSecure('/advertisements');
            return res.data
        }
    })

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <Error message={error.message}/>
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Slide direction="down" triggerOnce>
                    <div className="text-center mb-12 inter-font">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">Advertisements</h2>
                        <p className="text-gray-600 max-w-2xl lg:text-lg mx-auto">
                            Discover our latest and most popular properties in prime locations
                        </p>
                    </div>
                </Slide>

                <Bounce cascade damping={0.05} triggerOnce>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ads?.map((ad) => (
                            <AdvertisementCard key={ad._id} ad={ad} />
                        ))}
                    </div>
                </Bounce>
            </div>
        </section>
    );
};

export default AdvertisementSection;