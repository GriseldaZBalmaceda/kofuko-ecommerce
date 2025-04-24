"use client"

import React, { useState } from "react"

export const Add = () => {
  const [quantity, setQuantity] = useState(0)
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between">
        <div className="flext items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button className="cursor-pointer text-xl">-</button>
            {quantity}
            <button className="cursor-pointer text-xl">+</button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-500">4 items</span> left! <br />{" "}
            {"Don't"} miss it
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 oy-2 px-3 hover:bg-red-400 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:cursor-not-allowed">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
