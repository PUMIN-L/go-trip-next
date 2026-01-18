import ProductsGrid from "@/components/products/ProductsGrid"
import { Separator } from "@/components/ui/separator"
import BreadCrumbs from "@/global/BreadCrumbs"
import EmptyList from "@/global/EmptyList"
import { fetchFavoriteProductByUserId } from "@/utils/action"
import { currentUser } from "@clerk/nextjs/server"

async function FavoriteTripsPage({ pathname }: { pathname: string }) {
  const user = await currentUser()

  let clerkId = null
  if (user) {
    clerkId = user.id
  }

  let products = null
  if (clerkId) {
    const res = await fetchFavoriteProductByUserId(clerkId)
    products = res?.map((e) => e.product)
  }

  if (products) {
    const totalProduct = products.length
    if (totalProduct === 0) return <EmptyList />
    return (
      <>
        <section>
          <h4 className="font-medium text-lg">
            {totalProduct} of your favorite product
            {totalProduct > 1 && "s"}
          </h4>
          <div className="pt-5">
            <BreadCrumbs name="Favorite tripes" />
          </div>

          <Separator className="mt-5" />
          <ProductsGrid products={products} pathname={pathname} />
        </section>
      </>
    )
  }
}

export default FavoriteTripsPage
