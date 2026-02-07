"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { collections } from "@wix/stores";

export const Menu = ({
  categories,
  className,
}: {
  categories: collections.Collection[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={className || ""}>
      <Image
        src="/menu.png"
        alt="menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      ></Image>
      {open && (
        <div className="absolute text-center bg-violet-300 text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          {categories.map((cat) => (
            <Link key={cat._id} href={`/list?cat=${cat.slug}`}>
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
