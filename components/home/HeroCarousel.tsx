// 'use client'

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

// import hero1 from '@/public/images/imageHero1.jpg'
// import hero2 from '@/public/images/imageHero2.jpg'
// import hero3 from '@/public/images/imageHero3.jpg'
// import hero4 from '@/public/images/imageHero4.jpg'
// import hero5 from '@/public/images/imageHero5.jpg'
// import hero6 from '@/public/images/imageHero6.jpg'
// import hero7 from '@/public/images/imageHero7.jpg'

// import { Card, CardContent } from '../ui/card';
// import Image from 'next/image';
// import AutoPlay from 'embla-carousel-autoplay'
// import { useEffect, useRef, useState } from 'react';

// const carouselImage = [hero6, hero5, hero3, hero4, hero1, hero2, hero7]


// function HeroCarousel() {

//     const plugin = useRef(
//         AutoPlay({delay:3000, stopOnInteraction:true})
//     )

//       const [current, setCurrent] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % carouselImage.length)
//     }, 3000) // เปลี่ยนภาพทุก 3 วินาที
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <Carousel
//      opts={{
//     loop: true,
//   }}
//         plugins={[plugin.current]}
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={plugin.current.play}
//     >
//         <CarouselContent>
//             {
//                 carouselImage.map((image, index) => {
//                     return (
//                         <CarouselItem key={index} >
//                             <Card>
//                                 <CardContent className='' >
//                                     <Image
//                                         src={image} 
//                                         alt='hero-image'
//                                         className='w-full h-[24rem] rounded-md object-cover'
//                                         priority={index === 0}
//                                     />
//                                 </CardContent>
//                             </Card>
//                         </CarouselItem>
//                     )
//                 })
//             }
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//     </Carousel>
//   )
// }

// export default HeroCarousel


'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import hero1 from '@/public/images/imageHero1.jpg'
import hero2 from '@/public/images/imageHero2.jpg'
import hero3 from '@/public/images/imageHero3.jpg'
import hero4 from '@/public/images/imageHero4.jpg'
import hero5 from '@/public/images/imageHero5.jpg'
import hero6 from '@/public/images/imageHero6.jpg'
import hero7 from '@/public/images/imageHero7.jpg'

const carouselImage = [hero6, hero3, hero5, hero4, hero1, hero2, hero7]

export default function HeroFadeCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselImage.length)
    }, 4000) // เปลี่ยนภาพทุก 4 วินาที
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-md">
      {carouselImage.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-4000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt="hero"
            className="w-full h-full object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}