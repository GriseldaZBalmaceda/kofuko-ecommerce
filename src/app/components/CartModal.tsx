"use client"

import Image from "next/image"

export const CartModal = () => {
  const cartItems = true
  return (
    <div className=" w-max absolute p-4 rounded-md shadow shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems && <div className="text-cl">Cart is Empty</div>}
      <h2>Shopping Cart</h2>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <Image
            src="https://anmeshop.com/cdn/shop/files/products_stickerpack2_5_png_f5c35f9a-dd8f-4c34-956e-dd186b3f4468_1024x1024@2x.webp?v=1732574992"
            alt=""
            width={72}
            height={96}
            className="object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            {/*TOP */}
            <div className="">
              <div className="flex items-center justify-between gap-8">
                <h3 className="font-semibold">Product Name</h3>
                <div className=" p-1 bg-gray-50 rounded-sm">49</div>
              </div>
              <div className="text-sm text-gray-500">available</div>
            </div>
            {/*Bottom*/}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">QTY. 2</span>
              <span className="text-blue-500 underline"> Remove</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between font-semibold">
          <span className="">Subtotal</span>
          <span className="">$49</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="flex justify-between text-sm">
          <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
            View Cart
          </button>
          <button className="rounded-md py-3 px-4 ring-1 bg-black text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
