"use client"

import Image from "next/image"
import React from "react"
import { Filter } from "../components/Filter"
import { ProductList } from "../components/ProductList"
const ListPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/*CAMPAIGN */}
      <div className="hidden sm:flex bg-pink-200 px-4 flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Sonny Angel Kiss
          </h1>
          <button className="rounded-3xl bg-white text-red w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/pink-sonny.png" alt="" fill className="object-contain" />
        </div>
      </div>
      <Filter />
      <h1 className="text-xl mt-12 font-semibold">Collectibles</h1>
      <ProductList />
    </div>
  )
}
export default ListPage
