import { useQuery } from '@tanstack/react-query'
import { collections } from '@wix/stores'

interface CategoriesResponse {
  categories: collections.Collection[]
  total: number
}

export const useCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    },
  })
}

