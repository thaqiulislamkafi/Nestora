import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const content = {
    Story: (
      <div className="space-y-4 text-gray-700">
        <p>
          <strong className="text-gray-800">Our journey began with a simple vision:</strong> to create a real estate
          platform where trust, transparency, and professionalism are the foundation of every transaction.
        </p>
        <p>
          We noticed that many buyers and sellers were struggling with scattered information, hidden costs, and unclear
          processes. <strong className="text-gray-500">We wanted to change that.</strong>
        </p>
        <p>
          From day one, our goal has been to <strong>connect clients with properties that truly match their dreams and needs</strong>.
          Over the years, we’ve built strong relationships with property owners, investors, and home seekers — allowing
          us to bring the <strong className="text-gray-500">right opportunities to the right people</strong>.
        </p>
        <p>
          Today, we stand as a <strong className="text-gray-800">trusted partner in the real estate market</strong>, known for clear
          communication, fair pricing, and reliable service. And our story is still being written — with every satisfied
          client, we turn another page.
        </p>
      </div>
    ),

    Mission: (
      <div className="space-y-4 text-gray-700">
        <p>
          Our mission is <strong className="text-gray-800">simple yet powerful:</strong> to make buying, selling, and
          investing in real estate a smooth, informed, and rewarding experience.
        </p>
        <p>
          We are committed to <strong>helping clients navigate the property market with confidence</strong> by providing
          accurate information, expert advice, and full support at every step.
        </p>
        <p>
          We believe in <span className="font-semibold text-gray-500">honesty over shortcuts</span>, quality over
          quantity, and long-term relationships over quick deals.
        </p>
        <p>
          Whether it’s a <strong>first home, a commercial space, or an investment property</strong>, we treat every
          client’s goal as our own.
        </p>
        <p>
          Our mission drives us to <strong className="text-gray-500">continuously improve our tools, knowledge, and network</strong> —
          ensuring that our clients always get the best in the market.
        </p>
      </div>
    ),

    Success: (
      <div className="space-y-4 text-gray-700">
        <p>
          We measure success not by the number of deals closed, but by the <strong className="text-gray-800">smiles and trust we leave behind</strong>.
        </p>
        <p>
          From helping a young couple buy their first home to guiding investors toward profitable ventures, every success
          story strengthens our purpose.
        </p>
        <p className="font-semibold">Our achievements include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Assisting hundreds of families in finding their dream homes.</li>
          <li>Helping investors achieve <span className="text-gray-500 font-semibold">above-market returns</span> through smart property deals.</li>
          <li>Building a loyal client base that trusts us for repeat business and referrals.</li>
        </ul>
        <p>
          To us, success is a <strong>shared journey</strong>. When our clients succeed, we succeed. And with every new
          property handed over, we reaffirm our promise: <span className="text-gray-500 font-semibold">Your goal is our mission</span>.
        </p>
      </div>
    ),

    Team: (
      <p className="text-gray-700">
        Our team is a group of passionate real estate professionals with years of experience in helping clients find,
        sell, and invest in properties. Each member brings unique expertise and a commitment to providing exceptional
        service.
      </p>
    ),
}

  const tabs = [
    { id: "Story", label: "Story" },
    { id: "Mission", label: "Mission" },
    { id: "Success", label: "Success" },
    { id: "Team", label: "Team & Others" },
  ];

  return (

    <div className="mt-10 mb-30 inter-font p-6">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-800">About Us</h1>
        <p className="text-gray-600 lg:max-w-2xl my-6">Connect clients with their perfect property through expert guidance and market insights. From first-time buyers to seasoned investors — we make every deal smooth, transparent, and successful.</p>
      </div>

      <div className="divider my-12"></div>


      {/* Tabs */}
      <div className="flex gap-4 pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 border-b-2 font-medium transition ${
              activeTab === tab.id
                ? "border-[#fceb00] text-gray-800"
                : "border-transparent text-gray-600 hover:text-gray-900 cursor-pointer"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{content[activeTab]}</div>
    </div>
  );
};

export default AboutUs;
