"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { products } from "@wix/stores";
import { useProducts } from "../hooks/useProducts";

const PRODUCT_PER_PAGE = 20;

export const ProductList = ({
  categoryId,
  limit,
}: {
  categoryId?: string;
  limit?: number;
}) => {
  const { data, isLoading, error } = useProducts({
    categoryId,
    limit: limit || PRODUCT_PER_PAGE,
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] animate-pulse"
          >
            <div className="relative w-full h-80 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load products. Please try again.</p>
      </div>
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {data.products.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}>
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
            <span className="font-medium">{product.name}</span>
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
  );
};
