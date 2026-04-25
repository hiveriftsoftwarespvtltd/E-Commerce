import React from "react";

const SubscribeForm = () => {
  return (
    <div className="w-full bg-light-accent-1 py-12">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 text-accent">

        {/* LEFT TEXT */}
        <div className="text-center lg:text-left ">
          <h5 className=" text-xl font-semibold ">
            FOR LATEST UPDATES
          </h5>
          <p className=" mt-2 text-sm text-black">
            Stay connected with us! Subscribe to our newsletter and be the first
            to know about exciting updates, exclusive offers, and more.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex flex-col lg:flex-row gap-3 w-full max-w-md md:h-[40px]">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="border border-accent px-4 py-1 rounded-lg text-accent"
              required
            />
            <button className="bg-accent text-white px-6 py-2 rounded-lg cursor-pointer">
              SUBSCRIBE!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscribeForm;
