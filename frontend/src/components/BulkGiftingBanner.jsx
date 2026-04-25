import React from "react";
import Banner5 from "../assets/hero-banner-5.png"

const banner = {
  link: Banner5,

  desktop:
    Banner5,

  mobile:
    Banner5,
};

const BulkGiftingBanner = () => {
  return (
    <div className="w-full py-6">
      <a  className="block w-full">
        <div className="relative w-full" style={{ paddingTop: "50%" }}>
          {/* Desktop Image */}
          <img
            src={banner.desktop}
            alt="Bulk Gifting"
            className="absolute inset-0 w-full h-full object-cover hidden sm:block rounded-lg"
          />

          {/* Mobile Image */}
          <img
            src={banner.mobile}
            alt="Bulk Gifting Mobile"
            className="absolute inset-0 w-full h-full object-cover sm:hidden"
          />
        </div>
      </a>
    </div>
  );
};

export default BulkGiftingBanner;
