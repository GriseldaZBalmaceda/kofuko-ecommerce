"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number
  hasPrev: boolean
  hasNext: boolean
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="mt-12 flex justify-between w-full">
      <button
        className="rounded-md text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200 bg-pink-400"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200 bg-pink-400"
        onClick={() => createPageUrl(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  )
}
