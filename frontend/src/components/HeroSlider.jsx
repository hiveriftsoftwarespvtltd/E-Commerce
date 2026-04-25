import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Banner1 from "../assets/hero-banner1.png"
import Banner2 from "../assets/hero-banner-2.png"
import Banner3 from "../assets/hero-banner-3.png"
import Banner4 from "../assets/hero-banner-4.png"
import Banner5 from "../assets/hero-banner-5.png"

// const slides = [
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/glassware_1905x.progressive.png.jpg?v=1739435153",
//     mobile: "https://www.earthstore.in/cdn/shop/files/glassware_1_550x.progressive.png.jpg?v=1739435141",
//     link: "https://www.earthstore.in/collections/glassware",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_7_1905x.progressive.png.jpg?v=1739941050",
//     mobile: "https://www.earthstore.in/cdn/shop/files/serving_trays_2_550x.progressive.png.jpg?v=1739940944",
//     link: "https://www.earthstore.in/collections/tray",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_3_1905x.progressive.png.jpg?v=1737180690",
//     mobile: "https://www.earthstore.in/cdn/shop/files/1_55d78b08-8bfc-447a-ab57-05f501d985dc_550x.progressive.png.jpg?v=1735990883",
//     link: "https://www.earthstore.in/collections/home-decore",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/4_cdda9a0c-7e55-4b51-b910-864d0125011f_1905x.progressive.png.jpg?v=1737180822",
//     mobile: "https://www.earthstore.in/cdn/shop/files/3_2b25a6bb-0449-4d54-a8c7-bed42d9ccdec_550x.progressive.png.jpg?v=1735990884",
//     link: "https://www.earthstore.in/collections/dinnerware",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/5_86ef975f-cce9-47a2-be5c-a079013015f6_1905x.progressive.png.jpg?v=1737180879",
//     mobile: "https://www.earthstore.in/cdn/shop/files/4_e6cc4768-b681-484b-9188-5adc147395c0_550x.progressive.png.jpg?v=1735990884",
//     link: "https://www.earthstore.in/collections/jars",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_6_1905x.progressive.jpg?v=1737181092",
//     mobile: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_Canva_Banner_5_550x.progressive.png.jpg?v=1737181169",
//     link: "https://www.earthstore.in/collections/cup-sets",
//   },
//   {
//     desktop: "https://www.earthstore.in/cdn/shop/files/2_67a86fe3-a813-4bdc-a534-f22bddd56cdd_1905x.progressive.png.jpg?v=1737180902",
//     mobile: "https://www.earthstore.in/cdn/shop/files/5_dc0e438c-c2a8-436a-b14a-df290a8becdc_550x.progressive.png.jpg?v=1735990884",
//     link: "https://www.earthstore.in/collections/womenaccessories",
//   },
// ];

const slides = [
  {
    desktop: Banner1,
    mobile: Banner1,
    link: Banner1,
  },
  {
    desktop: Banner2,
    mobile: Banner2,
    link: Banner2,
  },
  {
    desktop: Banner3,
    mobile: Banner3,
    link: "https://www.earthstore.in/collections/home-decore",
  },
  //  {
  //   desktop: Banner4,
  //   mobile: Banner4,
  //   link: "https://www.earthstore.in/collections/home-decore",
  // },
  //  {
  //   desktop: Banner5,
  //   mobile: Banner5,
  //   link: "https://www.earthstore.in/collections/home-decore",
  // },
  // {
  //   desktop: "https://www.earthstore.in/cdn/shop/files/4_cdda9a0c-7e55-4b51-b910-864d0125011f_1905x.progressive.png.jpg?v=1737180822",
  //   mobile: "https://www.earthstore.in/cdn/shop/files/3_2b25a6bb-0449-4d54-a8c7-bed42d9ccdec_550x.progressive.png.jpg?v=1735990884",
  //   link: "https://www.earthstore.in/collections/dinnerware",
  // },
  // {
  //   desktop: "https://www.earthstore.in/cdn/shop/files/5_86ef975f-cce9-47a2-be5c-a079013015f6_1905x.progressive.png.jpg?v=1737180879",
  //   mobile: "https://www.earthstore.in/cdn/shop/files/4_e6cc4768-b681-484b-9188-5adc147395c0_550x.progressive.png.jpg?v=1735990884",
  //   link: "https://www.earthstore.in/collections/jars",
  // },
  // {
  //   desktop: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_6_1905x.progressive.jpg?v=1737181092",
  //   mobile: "https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Home_Decor_Canva_Banner_5_550x.progressive.png.jpg?v=1737181169",
  //   link: "https://www.earthstore.in/collections/cup-sets",
  // },
  // {
  //   desktop: "https://www.earthstore.in/cdn/shop/files/2_67a86fe3-a813-4bdc-a534-f22bddd56cdd_1905x.progressive.png.jpg?v=1737180902",
  //   mobile: "https://www.earthstore.in/cdn/shop/files/5_dc0e438c-c2a8-436a-b14a-df290a8becdc_550x.progressive.png.jpg?v=1735990884",
  //   link: "https://www.earthstore.in/collections/womenaccessories",
  // },
];

const HeroSlider = () => {
  
  return (
    <div className="w-full flex justify-center px-1">
      <div className="w-full  overflow-hidden">
        
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3000 }}
          loop={true}
          speed={1000}
          allowTouchMove={false}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <a >
                
                {/* Desktop Image */}
                <img
                  src={slide.desktop}
                  alt="banner"
                  className="hidden sm:block w-full object-cover rounded-lg"
                  style={{ aspectRatio: "2.62" }} // exactly EarthStore ratio
                />

                {/* Mobile Image */}
                <img
                  src={slide.mobile}
                  alt="banner"
                  className="block sm:hidden w-full object-contain object-center"
                  style={{ aspectRatio: "2 / 1" }} // mobile ratio 50%
                />

              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default HeroSlider;
