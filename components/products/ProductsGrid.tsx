import { Product } from "@/utils/types"
import ProductCard from "./ProductCard"

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />
      })}
    </div>
  )
}

export default ProductsGrid
