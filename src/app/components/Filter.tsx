import React from "react"

export const Filter = () => {
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        ></input>
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text sx rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        ></input>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-3xl text-sm font-medium bg-gray-200"
        >
          <option>Sort By</option>
          <option value="">Price (low to high)</option>
          <option value="">Price (high to low)</option>
        </select>
      </div>
    </div>
  )
}
