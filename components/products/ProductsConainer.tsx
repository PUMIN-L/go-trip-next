import EmptyList from "@/components/home/EmptyList"
import ProductsGrid from "@/components/products/ProductsGrid"
import { Separator } from "@/components/ui/separator"
import BreadCrumbs from "@/global/BreadCrumbs"
import { fetchProductsOnProductPage } from "@/utils/action"

async function ProductsContainer({ param }: { param: string | undefined }) {
  const products = await fetchProductsOnProductPage(param)

  const totalProduct = products.length
  if (totalProduct === 0) return <EmptyList />
  return (
    <>
      <section>
        <h4 className="font-medium text-lg">
          {totalProduct} product{totalProduct > 1 && "s"}
        </h4>
        <div className="pt-5">
          <BreadCrumbs name={null} />
        </div>

        <Separator className="mt-5" />
        <ProductsGrid products={products} />
      </section>
    </>
  )
}

export default ProductsContainer
