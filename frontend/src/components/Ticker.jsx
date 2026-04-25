import React from "react";

const messages = [
  "Limited Time Offer: Free Shipping on Orders Over ₹1000!",
  "Explore Our Blog for Home Decor Tips and Ideas.",
  "Follow Us on Instagram for Daily Inspiration and Giveaways.",
];

const Ticker = () => {
  return (
    <div className="w-full overflow-hidden bg-accent py-3 mt-3">

      {/* CUSTOM KEYFRAMES (INLINE) */}
      <style>
        {`
          @keyframes scrollTicker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div className="flex w-[200%] animate-[scrollTicker_20s_linear_infinite]">
        
        {/* ORIGINAL CONTENT */}
        <div className="flex gap-10 whitespace-nowrap">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-white text-xl font-semibold">✲</span>
              <p className="text-white text-[15px] font-medium">{msg}</p>
            </div>
          ))}
        </div>

        {/* CLONED CONTENT FOR LOOP */}
        <div className="flex gap-10 whitespace-nowrap ml-10">
          {messages.map((msg, idx) => (
            <div key={idx + "-clone"} className="flex items-center gap-2">
              <span className="text-white text-xl font-semibold">✲</span>
              <p className="text-white text-[15px] font-medium">{msg}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Ticker;
