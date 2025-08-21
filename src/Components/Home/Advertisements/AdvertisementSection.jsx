import { useQuery } from '@tanstack/react-query';
import { Bounce, Slide } from 'react-awesome-reveal';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../SharedElement/Loading';
import Error from '../../SharedElement/Error';
import Card from './Card';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const AdvertisementSection = () => {
    const axiosSecure = useAxios();
    const { darkMode } = useContext(AuthContext);

    const { data: ads = [], isLoading, error } = useQuery({
        queryKey: ['advertisements'],
        queryFn: async () => {
            const res = await axiosSecure('/advertisements');
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message} />;

    return (
        <section
            className={`py-20 px-4 sm:px-6 lg:px-8 my-20 transition-colors duration-500 ${
                darkMode
                    ? ' text-gray-200'
                    : ' text-gray-900'
            }`}
        >
            <div className="max-w-7xl mx-auto">
                <Slide direction="down" triggerOnce>
                    <div className="text-center mb-12 inter-font">
                        <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">
                            Advertisements
                        </h2>
                        <div className="w-35 h-1 bg-[#fceb00] mx-auto rounded-full my-2"></div>
                        <p className="max-w-2xl lg:text-lg mx-auto text-gray-600 dark:text-gray-300">
                            Discover our latest and most popular properties in prime locations
                        </p>
                    </div>
                </Slide>

                <Bounce cascade damping={0.05} triggerOnce>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ads?.map((ad) => (
                            <Card key={ad._id} value={ad} title={'Advertise'} />
                        ))}
                    </div>
                </Bounce>
            </div>
        </section>
    );
};

export default AdvertisementSection;
