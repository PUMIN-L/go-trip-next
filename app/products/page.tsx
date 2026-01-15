export const dynamic = "force-dynamic"
import ProductsContainer from "@/components/products/ProductsConainer"

async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const param = await searchParams

  return <ProductsContainer param={param.search} />
}

export default ProductsPage
