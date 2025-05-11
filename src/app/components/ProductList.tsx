import Image from "next/image"
import Link from "next/link"
import React from "react"
import { wixClientServer } from "@/lib/wixClientServer"
import { products } from "@wix/stores"

const PRODUCT_PER_PAGE = 20
export const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string
  limit?: number
  searchParams?: any
}) => {
  console.log("inside productlist")
  const wixClient = await wixClientServer()
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .gt("priceData.price", (searchParams?.min || 0) - 0.01)
    .lt("priceData.price", searchParams?.max || 9999999)
    .limit(limit || PRODUCT_PER_PAGE)
  // .find()

  const res = await productQuery.find()
  // Sort the results manually as a fallback
  const sortedItems = res.items.sort((a, b) => {
    const priceA = a.priceData?.price || 0
    const priceB = b.priceData?.price || 0
    return searchParams?.sort?.startsWith("desc")
      ? priceA - priceB
      : priceB - priceA
  })
  return (
    <div className="flex gap-x-8 gap-y-16  flex-wrap">
      {sortedItems.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            {product.media?.items && (
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-fit rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
            )}
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium line-clamp-1">{product.name}</span>
            <span className="font-semibold">{product.priceData?.price}</span>
          </div>
          <div className="text-sm text-gray-500">
            {product.additionalInfoSections?.find(
              (section: any) => section.title === "shortDesc"
            )?.description || ""}
          </div>
          <button className="rounded-2xl ring-1 ring-purple-950 py-2 px-4 text-xs w-max-content hover:bg-purple-950 hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  )
}
