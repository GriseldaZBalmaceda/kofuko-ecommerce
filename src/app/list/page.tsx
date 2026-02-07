"use client";

import Image from "next/image";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "../components/Filter";
import { ProductList } from "../components/ProductList";
import { useCategories } from "../hooks/useCategories";

const ListPage = () => {
  const searchParams = useSearchParams();
  const catSlug = searchParams.get("cat");
  const name = searchParams.get("name");

  const { data: categoriesData } = useCategories();
  const category = categoriesData?.categories?.find((c) => c.slug === catSlug);
  console.log(category?.media?.mainMedia?.image);
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/*CAMPAIGN */}
      <div className="flex px-4 flex justify-between h-[500px]">
        <div className="relative w-full h-full">
          <Image
            className="h-full w-full opacity-80"
            src={category?.media?.mainMedia?.image.url || ""}
            alt=""
            fill
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            {category?.name || "All Products"}
          </h1>
        </div>
      </div>
      <Filter />
      <h1 className="text-xl mt-12 font-semibold">
        {name ? `Results for "${name}"` : category?.name || "All Products"}
      </h1>
      <ProductList categoryId={category?._id} name={name || undefined} />
    </div>
  );
};
export default ListPage;
