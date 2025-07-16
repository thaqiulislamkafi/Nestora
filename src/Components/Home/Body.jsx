import React from 'react';
import Banner from './Banner';
import AdvertisementSection from './Advertisements/AdvertisementSection';
import MarqueeReview from './MarqueeReview';
import Works from './Works';
import Services from './Services';

const Body = () => {
    return (
        <div>
           <Banner/>
           <Works/>
           <AdvertisementSection/>
           <Services/>
           <MarqueeReview/>
        </div>
    );
};

export default Body;