import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import Image from "next/image"
import { Product } from "@/utils/types"
import { fetchProductRating, fetchProductReviews } from "@/utils/action"
import Rating from "@/reviews/Rating"
import FavoriteToggleButton from "../favorite/FavoriteToggleButton"

async function ProductCard({
  product,
  pathname
}: {
  product: Product
  pathname?: string
}) {
  const { name, price, image, country, id } = product
  const resProductRating = await fetchProductRating(id)
  if (!resProductRating) {
    return null
  }
  const { rating, count } = resProductRating

  const reviews = await fetchProductReviews(id)

  if (!reviews) {
    return null
  }

  const productId = product.id

  return (
    <article key={productId} className="group relative active:scale-99 ">
      <div className=" absolute top-8 right-8 z-5">
        <FavoriteToggleButton productId={productId} pathname={pathname} />
      </div>
      <Link href={`/products/${productId}`}>
        <Card className="transform group-hover:shadow-xl bg-gray-100   dark:bg-sidebar transition-shadow duration-500">
          <CardContent className="">
            <div className="relative h-48 md:h-48 rounded overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                // priority
                className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h2 className="text-lg capitalize text-muted-foreground pt-5">
              {country}
            </h2>
            <div className="mt-1 text-center">
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-lg  capitalize tracking-wider">{name}</h2>
                <div className="flex  justify-center items-center gap-1">
                  <small className="text-sm ">
                    {count > 0 ? <Rating rating={reviews[0]?.rating} /> : null}
                  </small>
                  <small className="text-sm  capitalize ">
                    {`(${count}) reviews`}
                  </small>
                </div>
              </div>
              <p className="mt-1 flex text-lg">Price ฿ {price}.00</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}

export default ProductCard
