import React from "react";
import { useNavigate } from "react-router-dom";

const shopByPrice = [
  {
    link: "https://www.earthstore.in/collections/under-500",
    image:
      "https://www.earthstore.in/cdn/shop/files/product_under_500_340x.png?v=1736142055",
    alt: "product under 500",
    price: 500,
  },
  {
    link: "https://www.earthstore.in/collections/under-1000",
    image:
      "https://www.earthstore.in/cdn/shop/files/product_under_1000_340x.png?v=1736142036",
    alt: "product under 1000",
    price: 1000,
  },
  {
    link: "https://www.earthstore.in/collections/under-1500",
    image:
      "https://www.earthstore.in/cdn/shop/files/product_under_1500_340x.png?v=1736142075",
    alt: "product under 1500",
    price: 1500,
  },
  {
    link: "https://www.earthstore.in/collections/under-2000",
    image:
      "https://www.earthstore.in/cdn/shop/files/product_under_2000_340x.png?v=1736142107",
    alt: "product under 2000",
    price: 2000,
  },
  {
    link: "https://www.earthstore.in/collections/under-5000",
    image:
      "https://www.earthstore.in/cdn/shop/files/product_under_5000_340x.png?v=1736142014",
    alt: "product under 5000",
    price: 5000,
  },
];

const ShopByPrice = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-10">
      <h2 className="text-center text-accent text-xl font-bold mb-8">
        SHOP BY PRICE
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {shopByPrice.map((item, idx) => (
          // <a key={idx}  className="block">
          //   <div className="relative w-full" style={{ paddingTop: "125%" }}>
          //     <img
          //       src={item.image}
          //       alt={item.alt}
          //       className="absolute inset-0 w-full h-full object-cover"
          //     />
          //   </div>
          // </a>
          <div
            className="flex flex-col rounded-full bg-accent text-white w-[150px] h-[150px] 
justify-center items-center text-2xl font-bold cursor-pointer 
animate-pulse hover:animate-none hover:scale-110 transition-all duration-300"
            onClick={() => navigate(`/products?max=${item?.price}`)}
          >
            <span>Under</span>
            <span>{item?.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByPrice;
