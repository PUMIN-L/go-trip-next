import ProductsContainer from "@/components/products/ProductsConainer"
import LoadingContainer from "@/global/LoadingContainerProductPage"

async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const param = await searchParams
  // return <LoadingContainer />
  return <ProductsContainer param={param.search} />
}

export default ProductsPage
