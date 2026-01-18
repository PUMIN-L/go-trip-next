import FavoriteToggleButton from "@/components/favorite/FavoriteToggleButton"
import { Button } from "@/components/ui/button"
import BreadCrumbs from "@/global/BreadCrumbs"
import EmptyList from "@/global/EmptyList"
import ProductReviews from "@/reviews/ProductReviews"
import SubmitReview from "@/reviews/SubmitReview"
import AddToCart from "@/single-product/AddToCard"
import ProductRating from "@/single-product/ProductRating"
import { fetchAdminProductDetails } from "@/utils/action"
import { SignInButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

import Image from "next/image"

async function SingleProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const user = await currentUser()

  const productId = resolvedParams?.id

  const product = await fetchAdminProductDetails(productId)

  if (product === null) return <EmptyList />

  const { image, name, country, description, price } = product

  if (!product) {
    return <EmptyList />
  }

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 overflow-hidden">
        {/* IMAGE FIRST COL */}
        <div className="relative w-full aspect-4/5 h-96 lg:h-full lg:aspect-auto">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>

            <FavoriteToggleButton productId={productId} />
          </div>
          <ProductRating productId={productId} />
          <h4 className="text-xl mt-2">{country}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            ฿{price}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart product={product} />
        </div>
      </div>
      <ProductReviews productId={productId} />
      {user !== null ? (
        <SubmitReview productId={productId} />
      ) : (
        <SignInButton mode="modal">
          <Button asChild>
            <button className="  text-start cursor-pointer">
              Login for create reviews
            </button>
          </Button>
        </SignInButton>
      )}
    </section>
  )
}

export default SingleProductPage
