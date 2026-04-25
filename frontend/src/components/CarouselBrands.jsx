import React from "react";
import { useNavigate } from "react-router-dom";


const items = [
  {
    link: "https://www.earthstore.in/collections/home-decore",
    image:"https://www.earthstore.in/cdn/shop/files/2_8ab2343e-4cd4-4c81-b8af-ffc0a90b6c75_340x.png?v=1735294750",
  },
  {
    link: "https://www.earthstore.in/collections/diffusers",
    image:"https://www.earthstore.in/cdn/shop/files/9_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/planters-and-vases",
    image:"https://www.earthstore.in/cdn/shop/files/3_446e9ba8-2077-48d3-95dd-5a42d9c3d7b3_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/womenaccessories",
    image:"https://www.earthstore.in/cdn/shop/files/10_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/combo-offers",
    image:"https://www.earthstore.in/cdn/shop/files/category_images_5_340x.png?v=1735362242",
  },
  {
    link: "https://www.earthstore.in/collections/travel-mug",
    image:"https://www.earthstore.in/cdn/shop/files/category_images_3_340x.png?v=1735296280",
  }
];

const routeMap = {
  "https://www.earthstore.in/collections/home-decore": "/TableDecor",
  "https://www.earthstore.in/collections/diffusers": "/Aromadiffusers",
  "https://www.earthstore.in/collections/planters-and-vases": "/Plantersvases",
  "https://www.earthstore.in/collections/womenaccessories": "/WomenAccessories",
  "https://www.earthstore.in/collections/combo-offers": "/Combooffers",
  "https://www.earthstore.in/collections/travel-mug": "/TravelMug",
};

const CarouselBrands = () => {
  const navigate = useNavigate();

  const goToPage = (link) => {
    const route = routeMap[link];
    if (route) navigate(route);
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">

        {/* FIRST ROW (6 CARDS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              onClick={() => goToPage(item.link)}
              className="block w-full overflow-hidden cursor-pointer 
                         transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="relative w-full" style={{ paddingTop: "125%" }}>
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default CarouselBrands;
