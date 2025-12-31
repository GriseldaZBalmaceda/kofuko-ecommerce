import { useQuery } from '@tanstack/react-query'
import { products } from '@wix/stores'

interface ProductResponse {
  product: products.Product
}

export const useProduct = (slug: string, enabled: boolean = true) => {
  return useQuery<ProductResponse>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await fetch(`/api/products?slug=${slug}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }
      return response.json()
    },
    enabled: enabled && !!slug,
  })
}

