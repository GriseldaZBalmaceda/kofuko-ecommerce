"use client";

import Link from "next/link";
import { Menu } from "./Menu";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { NavIcons } from "./NavIcons";
import { useCategories } from "../hooks/useCategories";

export const Navbar = () => {
  const { data } = useCategories();
  const categories = data?.categories || [];

  return (
    <>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <div className="flex h-full items-center justify-between md:hidden">
          <div className="flex space-x-4">
            <Menu categories={categories} />
            <Link href="/">
              <div className="text-2xl tracking-wide">Kofuko</div>
            </Link>
          </div>

          <NavIcons />
        </div>
        <div className="hidden md:flex items-center h-full justify-between gap-8">
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Menu className="xl:hidden" categories={categories} />

            <Link href="/" className="flex gap-3">
              <div className="text-2xl tracking-wide">Kofuko</div>
            </Link>
            <div className="hidden xl:flex gap-4 ">
              {categories.map((cat) => (
                <Link key={cat._id} href={`/list?cat=${cat.slug}`}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
            <SearchBar />
            <NavIcons />
          </div>
        </div>
      </div>
      <div className="w-full flex m-2 md:hidden ">
        <SearchBar className="m-2" />
      </div>
    </>
  );
};
