import { fetchProductReviews } from "@/utils/action"
import ReviewCard from "./ReviewCard"
import SectionTitle from "@/components/home/SectionTitle"

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId)

  if (!reviews) {
    return null
  }

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName, clerkId, id } =
            review
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
            clerkId,
            id
          }
          return (
            <ReviewCard
              key={review.id}
              reviewInfo={reviewInfo}
              productId={productId}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ProductReviews
