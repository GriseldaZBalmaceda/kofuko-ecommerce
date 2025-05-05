"use client"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React, { useState } from "react"

export const ProductsImages = ({ items }: { items: any }) => {
  const [imageIndex, setImageIndex] = useState(0)
  return (
    <div className="">
      <div className="h-[300px] relative">
        <Image
          src={items[imageIndex].image.url}
          alt=""
          fill
          sizes="50vh"
          className="object-cover rounded-md"
        ></Image>
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => {
          return (
            <div
              onClick={() => {
                setImageIndex(i)
              }}
              key={item._id}
              className="w-1/4 h-24 relative gap-4 mt-8 cursor-pointer "
            >
              <Image
                src={item.image.url}
                alt=""
                fill
                sizes="30vh"
                className="object-cover rounded-md"
              ></Image>
            </div>
          )
        })}
      </div>
    </div>
  )
}
