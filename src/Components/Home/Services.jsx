import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      image: 'https://img.icons8.com/ios-filled/50/home.png',
      title: 'Verified Property Listings',
      description: 'Access thousands of verified apartments, plots, and homes across Bangladesh with detailed insights and photos.'
    },
    {
        id: 2,
        image: 'https://img.icons8.com/color/96/real-estate-agent.png',
        title: 'Trusted Agent Connection',
        description: 'Easily connect with professional agents for property visits, negotiations, and expert guidance.'
      },
      {
        id: 3,
        image: 'https://img.icons8.com/fluency/96/virtual-reality.png',
        title: 'Virtual Property Tours',
        description: 'Explore properties from your screen with 360° virtual tours — saving your time and travel costs.'
      }
      ,
    {
      id: 4,
      image: 'https://img.icons8.com/ios-filled/50/contract.png',
      title: 'Offer & Deal Management',
      description: 'Submit offers, negotiate deals, and finalize your agreements securely with our guided tools.'
    },
    {
      id: 5,
      image: 'https://img.icons8.com/ios-filled/50/law.png',
      title: 'Legal & Document Support',
      description: 'Get assistance with legal paperwork, ownership verification, and secure transactions.'
    },
    {
      id: 6,
      image: 'https://img.icons8.com/ios-filled/50/help.png',
      title: 'Post-Sale Support',
      description: 'We help you after the purchase too — from utility setup to property handover and more.'
    }
  ];

  return (
    <section className="py-30 bg-[#03373D] rounded-2xl my-30">
      <div className="container mx-auto px-6 lg:px-20  text-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-100">Our Services</h2> 
          <div className="w-35 h-1 bg-[#fceb00] mx-auto rounded-full my-2"></div>
          <p className="mt-4 text-lg text-gray-100 max-w-3xl mx-auto">
            Nestora simplifies your journey to buy or sell property — offering verified listings, expert agent help, and full legal support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:bg-[#e6d70c] transition-colors duration-500 py-4"
            >
              <div className="flex justify-center">
                <div className="bg-gradient-to-b from-white to-gray-100 flex items-center justify-center rounded-full p-4">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
