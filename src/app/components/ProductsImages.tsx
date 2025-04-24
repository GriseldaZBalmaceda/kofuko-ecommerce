import Image from "next/image"
import React, { useState } from "react"

export const ProductsImages = () => {
  const productImageArray = [
    {
      id: 1,
      url: "https://anmeshop.com/cdn/shop/files/gc0560-01_1000x_jpg_1024x1024@2x.webp?v=1744145959",
    },
    {
      id: 2,
      url: "https://anmeshop.com/cdn/shop/files/Screenshot2025-04-09at4.45.30PM_1080x.png?v=1744231640",
    },
    {
      id: 3,
      url: "https://anmeshop.com/cdn/shop/files/246120-4_jpg_1024x1024@2x.webp?v=1738721311",
    },
  ]
  const [imageIndex, setImageIndex] = useState(0)
  return (
    <div className="">
      <div className="h-[300px] relative">
        <Image
          src={productImageArray[imageIndex].url}
          alt=""
          fill
          sizes="50vh"
          className="object-cover rounded-md"
        ></Image>
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {productImageArray.map((img) => {
          return (
            <div
              onClick={() => {
                setImageIndex(img.id)
              }}
              key={img.id}
              className="w-1/4 h-24 relative gap-4 mt-8 cursor-pointer "
            >
              <Image
                src={img.url}
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
