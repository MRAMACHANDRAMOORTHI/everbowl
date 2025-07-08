import React from 'react'
import { HeroSection } from '../components/home/HeroSection'
import { WhyEverBowl } from '../components/home/WhyEverBowl'
import { MenuPreview } from '../components/home/MenuPreview'
import { OrderProcess } from '../components/home/OrderProcess'

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyEverBowl />
      <MenuPreview />
      <OrderProcess />
    </>
  )
}