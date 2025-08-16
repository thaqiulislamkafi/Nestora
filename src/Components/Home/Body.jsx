import React from 'react';
import Banner from './Banner';
import AdvertisementSection from './Advertisements/AdvertisementSection';
import MarqueeReview from './MarqueeReview';
import Works from './Works';
import Services from './Services';
import FAQ from './FAQ';
import Contact from './Contact';

const Body = () => {
    return (
        <div>
           <Banner/>
           <Works/>
           <AdvertisementSection/>
           <Services/>
           <MarqueeReview/>
           <FAQ/>
           <Contact/>
        </div>
    );
};

export default Body;