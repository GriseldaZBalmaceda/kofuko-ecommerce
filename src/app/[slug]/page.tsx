import { notFound } from "next/navigation"
import { Add } from "../components/Add"
import { CustomizeProducts } from "../components/CustomizeProducts"
import { ProductsImages } from "../components/ProductsImages"
import { wixClientServer } from "@/lib/wixClientServer"

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer()
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find()
  if (!products.items[0]) {
    return notFound()
  }
  const product = products.items[0]
  console.log(product.variants)
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col md:flex-row lg:flex-row gap-16">
      <div className="w-full  lg:sticky top-20 h-max">
        <ProductsImages items={product.media?.items} />
      </div>
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100"></div>
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-centr gap-4">
            <h3 className="medium text-2xl">
              {product.price?.discountedPrice}
            </h3>
            <h2 className="text-xl text-gray-500 line-through">
              {product.price?.price}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100"></div>
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100"></div>
        <div>
          {product.additionalInfoSections?.map((section: any) => (
            <div className="text-sm" key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SinglePage
