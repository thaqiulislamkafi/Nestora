import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Zoom } from 'react-awesome-reveal';

const slides = [
  {
    image: 'https://i.postimg.cc/3R6ymTK8/banner-1.jpg',
    title: 'Find Your',
    typewriterWords: ['Home', 'Apartment', 'Villa'],
    description: 'Nestora brings you closer to your perfect living space—no matter your style or budget.',
  },
  {
    image: 'https://i.postimg.cc/t4trXXbV/banner-2.jpg',
    title: 'Buy, Sell, or Invest in',
    typewriterWords: ['Homes', 'Plots', 'Properties'],
    description: 'Your all-in-one real estate solution—fast, trusted, and always updated.',
  },
  {
    image: 'https://i.postimg.cc/1z8NvHv5/banner-3.jpg',
    title: 'Discover Properties in',
    typewriterWords: ['Dhaka', 'Chattogram', 'Sylhet'],
    description: 'Browse listings from top locations and start your next chapter with Nestora.',
  },
];

const Banner = () => {
  return (

    <Zoom cascade triggerOnce damping={1.01}>
      <div className="my-20 rounded-3xl">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`banner Slide-${index + 1} relative h-screen max-h-[700px] rounded-3xl bg-cover bg-center sora-font`}
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${slide.image})`,
                }}
              >
                <div className="text-white w-[80.94vw] mx-auto ">
                  <p className="cover-title text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}{' '}
                    <span className="text-[#fceb00] font-extrabold">
                      <Typewriter
                        words={slide.typewriterWords}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={60}
                        delaySpeed={1500}
                      />
                    </span>
                  </p>
                  <p className="cover-description max-w-2xl mb-6">
                    {slide.description}
                  </p>
                  <button className="Button cover-button text-black px-6 py-1 rounded-xl font-semibold hover:bg-lime-300 transition">
                    Explore
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Zoom>

  );
};

export default Banner;
