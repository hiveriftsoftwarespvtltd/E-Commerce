import React from "react";

export default function ResponsiveImage() {
  const desktopImg =
    "https://www.earthstore.in/cdn/shop/files/6_84e670f4-749d-4009-9f99-587f7b79c29b_1905x.progressive.png.jpg?v=1735803818";

  const mobileImg =
    "https://www.earthstore.in/cdn/shop/files/6_84e670f4-749d-4009-9f99-587f7b79c29b_550x.progressive.png.jpg?v=1735803818";

  return (
    <div className="image-animation w-full">
      {/* Desktop Image */}
      <div
        className="hidden sm:block relative w-full"
        style={{ paddingTop: "28.947%" }} // Aspect ratio same Shopify
      >
        <img
          src={desktopImg}
          alt="Banner"
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Mobile Image */}
      <div
        className="sm:hidden relative w-full"
        style={{ paddingTop: "28.947%" }}
      >
        <img
          src={mobileImg}
          alt="Banner mobile"
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
}
