import React from 'react';
import Banner from './Banner';
import AdvertisementSection from './Advertisements/AdvertisementSection';
import MarqueeReview from './MarqueeReview';

const Body = () => {
    return (
        <div>
           <Banner/>
           <AdvertisementSection/>
           <MarqueeReview/>
        </div>
    );
};

export default Body;