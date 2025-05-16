"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import React from "react"

export const Filter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  console.log("im rendering")
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        ></input>
        <input
          onChange={handleFilterChange}
          type="text"
          name="max"
          placeholder="max price"
          className="text sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        ></input>
        <select
          onChange={handleFilterChange}
          name="sort"
          id=""
          className="py-2 px-4 rounded-3xl text-sm font-medium bg-gray-200"
        >
          <option>Sort By</option>
          <option value="desc price">Price (low to high)</option>
          <option value="asc price">Price (high to low)</option>
        </select>
      </div>
    </div>
  )
}
