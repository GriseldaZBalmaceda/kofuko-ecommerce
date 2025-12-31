import { useQuery } from '@tanstack/react-query'
import { products } from '@wix/stores'

interface UseProductsOptions {
  categoryId?: string
  limit?: number
  enabled?: boolean
}

interface ProductsResponse {
  products: products.Product[]
  total: number
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { categoryId, limit, enabled = true } = options

  return useQuery<ProductsResponse>({
    queryKey: ['products', categoryId, limit],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (categoryId) params.append('categoryId', categoryId)
      if (limit) params.append('limit', limit.toString())

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return response.json()
    },
    enabled,
  })
}

