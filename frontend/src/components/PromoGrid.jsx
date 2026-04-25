import React from "react";
import { useNavigate } from "react-router-dom";
import productData from "../../products.json"
import fallbackImage from "../assets/accessories.png";

const items = [
  {
    route: "/Mugs",
    image:
      "https://www.earthstore.in/cdn/shop/files/best_ceramic_mugs_340x.png?v=1736142272",
  },
  {
    route: "/Bowl",
    image:
      "https://www.earthstore.in/cdn/shop/files/5_93ed8b83-8b4c-46c5-b1b0-f9656fb95eb6_340x.png?v=1735294749",
  },
  {
    route: "/CupSets",
    image:
      "https://www.earthstore.in/cdn/shop/files/ceramic_tea_sups_340x.png?v=1736142207",
  },
  {
    route: "/MultipurposeJar",
    image:
      "https://www.earthstore.in/cdn/shop/files/8_c792728e-19cd-47f4-a96a-facf1a5f2b43_340x.png?v=1735294749",
  },
  {
    route: "/DipsPlate",
    image:
      "https://www.earthstore.in/cdn/shop/files/6_d185ab90-006c-436c-835a-d715152aa6af_340x.png?v=1735294750",
  },
  {
    route: "/Glassware",
    image:
      "https://www.earthstore.in/cdn/shop/files/Glassware_-_Glass_Online_Drinking_Glasses_Drinkware_94975709-5c5e-4f5c-a9f8-1f6fac59744a_340x.png?v=1739525967",
  },
  {
    route: "/Dinnerware",
    image:
      "https://www.earthstore.in/cdn/shop/files/11_340x.png?v=1735294749",
  },
  {
    route: "/Cookware",
    image:
      "https://www.earthstore.in/cdn/shop/files/12_340x.png?v=1735294749",
  },
  {
    route: "/Tray",
    image:
      "https://www.earthstore.in/cdn/shop/files/Serving_Trays_340x.png?v=1739525087",
  },
];

const PromoGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

          {productData?.products?.slice(0,5).map((item, idx) => (
            <div
              key={idx}
              // onClick={() => navigate(item.route)}
              className="w-full block overflow-hidden cursor-pointer 
                         transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="relative w-full" style={{ paddingTop: "125%" }}>
                <img
                  src={item?.images[0] || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PromoGrid;
