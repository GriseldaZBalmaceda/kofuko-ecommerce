import { CategoryList } from "./components/CategoryList"
import { ProductList } from "./components/ProductList"
import { Slider } from "./components/Slider"
import { Suspense } from "react"
const HomePage = async () => {
  // const wixClient = await wixClientServer()
  // const res = await wixClient.products.queryProducts().find()
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList categoryId={"0ce3f462-97a8-b413-be74-35ccdc25918f"} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl mb-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage
