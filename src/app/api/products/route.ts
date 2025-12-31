import { NextRequest, NextResponse } from 'next/server'
import { wixClientServer } from '@/lib/wixClientServer'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    const limit = searchParams.get('limit')
    const slug = searchParams.get('slug')

    const wixClient = await wixClientServer()

    if (slug) {
      // Fetch single product by slug
      const product = await wixClient.products
        .queryProducts()
        .eq('slug', slug)
        .find()
      
      if (product.items.length === 0) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json({ product: product.items[0] })
    }

    // Fetch products list
    let query = wixClient.products.queryProducts()

    if (categoryId) {
      query = query.eq('collectionIds', categoryId)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const res = await query.find()

    return NextResponse.json({ products: res.items, total: res.total })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

