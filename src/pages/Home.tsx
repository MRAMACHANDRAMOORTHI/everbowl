import { FC } from 'react'
import  HeroSection  from '../components/home/HeroSection'
import { WhyEverBowl } from '../components/home/WhyEverBowl'
import { MenuPreview } from '../components/home/MenuPreview'
import { OrderProcess } from '../components/home/OrderProcess'

export const Home: FC = () => {
  return (
    <>
      <HeroSection />
      <WhyEverBowl />
      <MenuPreview />
      <OrderProcess />
    </>
  )
}