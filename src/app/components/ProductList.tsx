import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ProductList = () => {
  return (
    <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap'>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <div className='relative w-full h-80'>
               <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw' 
                    className='absolute object-fit rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                />
                <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-05_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw'
                />  
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Product Name</span>
                <span className='font-semibold'>$49</span>
            </div>
            <div className='text-sm text-gray-500'>My description</div>
            <button className='rounded-2xl ring-1 ring-purple-950 py-2 px-4 text-xs w-max-content hover:bg-purple-950 hover:text-white'>Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <div className='relative w-full h-80'>
               <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw' 
                    className='absolute object-fit rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                />
                <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-05_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw'
                />  
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Product Name</span>
                <span className='font-semibold'>$49</span>
            </div>
            <div className='text-sm text-gray-500'>My description</div>
            <button className='rounded-2xl ring-1 ring-purple-950 py-2 px-4 text-xs w-max-content hover:bg-purple-950 hover:text-white'>Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <div className='relative w-full h-80'>
               <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw' 
                    className='absolute object-fit rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                />
                <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-05_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw'
                />  
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Product Name</span>
                <span className='font-semibold'>$49</span>
            </div>
            <div className='text-sm text-gray-500'>My description</div>
            <button className='rounded-2xl ring-1 ring-purple-950 py-2 px-4 text-xs w-max-content hover:bg-purple-950 hover:text-white' >Add to Cart</button>
        </Link>
        <Link href="/test" className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <div className='relative w-full h-80'>
               <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw' 
                    className='absolute object-fit rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                />
                <Image 
                    src={"https://anmeshop.com/cdn/shop/files/gc0560-05_1000x_jpg_1024x1024@2x.webp?v=1744145959"} 
                    alt="" 
                    fill 
                    sizes='25vw'
                />  
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Product Name</span>
                <span className='font-semibold'>$49</span>
            </div>
            <div className='text-sm text-gray-500'>My description</div>
            <button className='rounded-2xl ring-1 ring-purple-950 py-2 px-4 text-xs w-max-content hover:bg-purple-950 hover:text-white'>Add to Cart</button>
        </Link>
    </div>
  )
}