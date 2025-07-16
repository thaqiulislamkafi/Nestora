import React from 'react';

const Works = () => {
  const workCards = [
    {
      id: 1,
      icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-search-real-estate-flatart-icons-outline-flatarticons.png',
      title: 'Browse Properties',
      subtitle: 'Explore a wide range of verified apartments, plots, and homes across Bangladesh.'
    },
    {
      id: 2,
      icon: 'https://img.icons8.com/color/96/customer-support.png',
      title: 'Connect with Agents',
      subtitle: 'Contact trusted real estate agents to ask questions or schedule a visit.'
    },
    {
      id: 3,
      icon: 'https://img.icons8.com/fluency/64/handshake.png',
      title: 'Make an Offer',
      subtitle: 'Submit your offer for a property and negotiate directly through Nestora.'
    },
    {
      id: 4,
      icon: 'https://img.icons8.com/color/48/contract.png',
      title: 'Secure the Deal',
      subtitle: 'Finalize your transaction with full transparency and secure documentation.'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 my-6">How Nestora Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workCards.map((card) => (
            <div 
              key={card.id} 
              className="bg-gray-50 px-6 py-7 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-start mb-4">
                <img 
                  src={card.icon} 
                  alt={card.title} 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 my-2">{card.title}</h3>
              <p className="text-gray-500 font-medium">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
