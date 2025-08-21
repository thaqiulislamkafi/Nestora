import React from "react";

const FAQ = () => {

  const faqs = [
    {
      question: "How do I list my property on your platform?",
      answer: (
        <>
          <p>
            Listing your property is simple and convenient. First, create an account on our platform and log in using your registered email.
          </p>
          <p>
            Once logged in, navigate to the <strong>Add New Property</strong>{" "} section from your dashboard. Fill out the required details such as property title, price, size, location, and detailed description.
          </p>
        </>
      )
    },
    {
      question: "Do you verify the properties before listing?",
      answer: (
        <>
          <p>
            Yes, every property listed on our platform goes through a strict{" "} <strong>verification process</strong> to ensure accuracy and authenticity.
          </p>
          <p>
            Our team checks ownership documents, location details, and property images to make sure the listing matches reality. This protects both buyers and sellers from fraudulent activities.
          </p>

        </>
      )
    },
    {
      question: "What fees are involved in selling a property?",
      answer: (
        <>
          <p>
            Our platform is designed to be transparent with all fees. The exact cost of selling depends on the type of property and your location.
          </p>
          <p>
            In most cases, sellers pay a small service charge once the sale is
            completed. This covers marketing, verification, and customer
            support.
          </p>
        </>
      )
    },
    {
      question: "Can I edit my property details after publishing?",
      answer: (
        <>
          <p>
            Yes, you have full control over your property listing even after it goes live. Simply log in to your account and open your dashboard.
          </p>
          <p>
            Find the property you wish to edit and click the{" "}
            <strong>Edit</strong> button. You can update details such as title,
            price, description, or images anytime.
          </p>
        </>
      )
    },
    {
      question: "Do you provide assistance for property buyers?",
      answer: (
        <>
          <p>
            Yes, our platform is built to support both property sellers and buyers equally. We understand that finding the right property can be challenging.
          </p>
          <p>
            Our team assists buyers in shortlisting properties, comparing features, and connecting directly with sellers or agents.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 mb-30 inter-font">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
        Frequently Asked Questions
      </h1> 
      <div className="w-60 h-1 bg-[#fceb00] mx-auto rounded-full my-2 mb-3"></div>
      <p className="text-center text-lg text-gray-500 mb-18">
        Find detailed answers to common questions about our real estate
        services.
      </p>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="collapse collapse-plus border border-base-300 bg-base-100 rounded-lg"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-semibold text-gray-800">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-600">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
