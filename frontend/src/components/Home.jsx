import React from 'react'
// Homepage components
import CategoryCarousel from "./CategoryCarousel";
import HeroSlider from ".//HeroSlider";
import PromoGrid from ".//PromoGrid";
import NewOnEarth from ".//NewOnEarth";
import BigBanner from ".//BigBanner";
import Ticker from ".//Ticker";
import VideoSlider from ".//VideoSlider";
import BulkGiftingBanner from ".//BulkGiftingBanner";
import CarouselBrands from ".//CarouselBrands";
import ProductCarousel from ".//ProductCarousel";
import ShopByPrice from ".//ShopByPrice";
import FooterTextBlocks from ".//FooterTextBlocks";
import SubscribeForm from ".//SubscribeForm";

const Home = () => {
  return (
    <div>
   <CategoryCarousel />
      <HeroSlider />
      {/* <PromoGrid /> */}
      {/* <NewOnEarth /> */}
      {/* <BigBanner /> */}
      <Ticker />
      <VideoSlider />
      {/* <BulkGiftingBanner /> */}
      {/* <CarouselBrands /> */}
      <ProductCarousel />
      <ShopByPrice />
      <FooterTextBlocks />
      <SubscribeForm />
   
    </div>
  )
}

export default Home
