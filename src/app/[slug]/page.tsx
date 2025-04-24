"use client"

import { Add } from "../components/Add"
import { CustomizeProducts } from "../components/CustomizeProducts"
import { ProductsImages } from "../components/ProductsImages"

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col md:flex-row lg:flex-row gap-16">
      <div className="w-full  lg:sticky top-20 h-max">
        <ProductsImages />
      </div>
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adispicing elit. Provident
          expedita.ipsa quareat architectp, justo ratione nisi upsum deserunt
        </p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex items-centr gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h3 className="medium text-2xl">$49</h3>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100"></div>
        <div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adispicing elit. Provident
              expedita.ipsa quareat architectp, justo ratione nisi upsum
              deserunt
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SinglePage
