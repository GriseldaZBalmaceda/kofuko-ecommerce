"use client"
import { products } from "@wix/stores"
import React, { useEffect, useState } from "react"
import { Add } from "./Add"
export const CustomizeProducts = ({
  productId,
  productVariants,
  productOptions,
}: {
  productId: string
  productVariants: products.Variant[]
  productOptions: products.ProductOption[]
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string
  }>({})
  const handleSelectedOption = (optionType: string, choice: string) => {
    console.log("handleselectedoption")
    setSelectedOption((prev) => ({ ...prev, [optionType]: choice }))
  }
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>()
  useEffect(() => {
    const variant = productVariants.find((v) => {
      const variantChoices = v.choices
      if (!variantChoices) return false
      return Object.entries(selectedOption).every(
        ([key, value]) => variantChoices[key] === value
      )
    })
    setSelectedVariant(variant)
  }, [selectedOption])
  const isItemInStock = (choices: { [key: string]: string }) => {
    return productVariants.some((variant) => {
      const variantChoices = variant.choices
      if (!variantChoices) return false
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock.quantity > 0
      )
    })
  }
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const isDisabled = !isItemInStock({
                ...selectedOption,
                [option.name!]: choice.description!,
              })

              const selected =
                selectedOption[option.name!] === choice.description
              const clickHandler = isDisabled
                ? undefined
                : () => handleSelectedOption(option.name!, choice.description!)

              return option.name === "Color" ? (
                <li
                  onClick={clickHandler}
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative "
                  style={{
                    backgroundColor: choice.value,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                  {isDisabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </li>
              ) : (
                <li className="ring-1 text-md rounded-md py-1 px-4 text-sm cursor-pointer">
                  {choice.description}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={selectedVariant?._id || "00000000-0000-0000-0000-0000000000"}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  )
}
