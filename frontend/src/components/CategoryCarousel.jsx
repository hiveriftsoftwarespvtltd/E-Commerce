import React, { useEffect, useState } from "react";

import tableware from "../assets/tableware.png";
import cookware from "../assets/cookware.png";
import drinkware from "../assets/drinkware.png";
import tray from "../assets/tray.png";
import glassware from "../assets/glassware.png";
import bowls from "../assets/bowls.png";
import accessories from "../assets/accessories.png";
import diffuser from "../assets/diffuser.png";
import decor from "../assets/decor.png";
import cupsets from "../assets/cupsets.png";
import jars from "../assets/jars.png";
import organizer from "../assets/organizer.png";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios-interceptor";

// ❌ interface hata diya
// ❌ TypeScript types remove
// ✔ Plain JS Array rakha

// const categories = [
//   { img: "/categories/Household.png", label: "Household", link: "/Tableware" },
//   { img: "/categories/Gadgets.png", label: "Gadgets", link: "/Cookware" },
//   { img: "/categories/Gifts.png", label: "Gifts", link: "/Drinkware" },
//   { img: "/categories/Home_Decor.png", label: "Home Decor", link: "/Tray" },
//   { img: "/categories/Car_Interior.png", label: "Car Interior", link: "/Glassware" },
//   { img: "/categories/Car_Exterior.png", label: "Car Exterior", link: "/Bowl" },
//   { img: "/categories/Accessories.png", label: "Accessories", link: "/Womenaccessories" },
 
// ];

const CategoryCarousel = () => {
  const [categories,setCategories] = useState([])

  const fetchAllCategories =async()=>{
    try {
      const response = await api.get("/category/getAllCategory")
      console.log("Categori response",response)
      if(response.data.success){
        setCategories(response.data.result)
      }
    } catch (error) {
      console.log("Fetch All Categories Error",error)
    }
  }
  const navigate = useNavigate()

  useEffect(()=>{
    fetchAllCategories()
  },[])

  console.log("All Categories",categories)
  return (
    <div className="w-full py-6 bg-white flex justify-center">
      <div className="w-full max-w-[1440px] px-4">

        {/* Mobile scroll, Desktop NO scroll */}
        <div
          className="
            flex gap-8 py-4
            overflow-x-auto 
            scrollbar-hide
            lg:overflow-visible lg:justify-between
          "
        >
          {categories?.map((item, idx) => (
            <div
              onClick={()=>navigate(`/products?category=${item.label || item.description}`)}
              key={idx}
              className="flex flex-col items-center min-w-[90px] hover:opacity-80 transition cursor-pointer"
            >
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={item.img  || item.web_image || item.app_image}
                  alt={item.label || item.description}
                  className="w-24 h-24 object-contain"
                />
              </div>

              <span className="text-bold-accent-1 text-sm font-medium mt-2">
                {item.label || item.description}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoryCarousel;
