import { fetchAllProducts } from "@/utils/action"
import ProductsGrid from "../products/ProductsGrid"
import EmptyList from "./EmptyList"
import SectionTitle from "./SectionTitle"

async function TrendingTrips() {
  const products = await fetchAllProducts()
  const trendingTrips = products.filter((e) => e.trendingTrip === true)
  if (products.length === 0) return <EmptyList />

  return (
    <section className="pt-18">
      <SectionTitle text="trending trip" />
      <ProductsGrid products={trendingTrips} />
    </section>
  )
}

export default TrendingTrips
