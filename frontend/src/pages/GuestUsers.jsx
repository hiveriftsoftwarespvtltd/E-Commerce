import CategoryCarousel from '@/components/CategoryCarousel'
import FooterTextBlocks from '@/components/FooterTextBlocks'
import HeroSlider from '@/components/HeroSlider'
import ProductCarousel from '@/components/ProductCarousel'
import ShopByPrice from '@/components/ShopByPrice'
import SubscribeForm from '@/components/SubscribeForm'
import Ticker from '@/components/Ticker'
import VideoSlider from '@/components/VideoSlider'
import React from 'react'
// Homepage components


const GuestUsers = () => {
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

export default GuestUsers
