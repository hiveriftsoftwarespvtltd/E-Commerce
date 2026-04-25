// components/ProductImages.jsx
import React, { useState } from "react";
import fallbackImage from "../assets/diffuser.png";

export default function ProductImages({ images = [] }) {
  const [activeImg, setActiveImg] = useState(0);

  const displayImages =
    images.length > 0
      ? images.slice(0, 4)
      : [fallbackImage, fallbackImage, fallbackImage, fallbackImage];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Main Image */}
      <div className="overflow-hidden rounded-lg group">
        <img
          src={displayImages[activeImg]}
          onError={(e) => (e.target.src = fallbackImage)}
          className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-110"
          alt="product"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {displayImages.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActiveImg(i)}
            className={`w-16 h-16 object-cover rounded border cursor-pointer ${
              activeImg === i ? "border-blue-500" : "border-gray-300"
            }`}
            alt="thumb"
          />
        ))}
      </div>
    </div>
  );
}