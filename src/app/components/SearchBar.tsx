"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const SearchBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("name") || "");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value) {
        router.push(`/list?name=${value}`);
      } else {
        router.push(`/list`);
      }
    }, 400);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [value, router]);

  return (
    <form
      className={`flex justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1 ${className || ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setValue("")}
        >
          x
        </button>
      )}
      <Image src="/search.png" width={20} height={10} alt="" />
    </form>
  );
};
