"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { useEffect } from "react";
export const Slider = () => {
  
    const [current, setCurrent]=useState(1)
    const slides=[
      { 
        id:1,
        title: 'Gourmet Meister',
        description: 'Blind Box Reveal',
        img:"https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959",
        bg:"bg-gradient-to-r from-blue-50 to yellow-50",
        url:'/'
      },
      { 
        id:2,
        title: 'Miffy',
        description: 'Rainbow',
        img:"https://anmeshop.com/cdn/shop/files/Screenshot2025-04-09at4.45.30PM_1080x.png?v=1744231640",
        bg:"bg-gradient-to-r from-blue-50 to yellow-50",
        url:'/'
      },
      { 
        id:2,
        title: 'Mochichi',
        description: 'Circle of friends',
        img:"https://anmeshop.com/cdn/shop/files/246120-4_jpg_1024x1024@2x.webp?v=1738721311",
        bg:"bg-gradient-to-r from-blue-50 to yellow-50",
        url:'/'
      }
    ]
    useEffect(()=>{
      const interval = setInterval(()=>{
        setCurrent(prev=>(prev === slides.length-1 ? 0 : prev + 1))
      }, 3000)
     
      return ()=> clearInterval(interval)
    },[])
  return (
    <div className='h-[calc(100vh-80px)] overflow-hidden'>
      <div className='w-max h-full flex transtion-all ease-in-out duration-1000' style= {{transform: `translateX(-${current * 100}vw`}}>
        {slides.map((slide)=>
            <div className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
             key={slide.id}
             >
                <div className='h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center' >
                    <h2 className='text-xl lg:text-3xl 2xl:text-5xl'>{slide.description}</h2>
                    <h1 className='text-5xl lg:text-6xl 2xl:text-8xl font-semibold '>{slide.title}</h1>
                    <Link href={slide.url}><button className='rounded-md bg-violet-950 text-white py-3 px-4'>SHOP NOW</button></Link>
                </div>
                <div className='h-1/2 xl:w-1/2 relative xl:h-full'>
                  <Image src={slide.img} alt="" fill sizes="100%" />
                </div>
            </div>
           
        )}
      </div>
      <div className='absolute m-auto left-1/2 bottom-8 flex gap-4'>
        {slides.map((slide,index)=> (
          <div 
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? 'scale-150': '' }`}
            key={slide.id}
            onClick={()=>setCurrent(index)}
            >
            {current == index && <div className='w-[6px] h-[6px] bg-gray-600 rounded-full' ></div>}
          </div>
          ))
        }
      </div>
    </div>
  )
}


