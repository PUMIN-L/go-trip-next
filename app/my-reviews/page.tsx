import { Separator } from "@/components/ui/separator"
import ReviewCard from "@/reviews/ReviewCard"
import { fetchReviewsByClerkId } from "@/utils/action"
import { currentUser } from "@clerk/nextjs/server"

async function MyReviews() {
  const user = await currentUser()
  const clerkId = user !== null ? user.id : null

  const reviews = await fetchReviewsByClerkId(clerkId)

  if (!reviews || !reviews[0]) {
    return (
      <>
        <h1 className="text-2xl mb-5">Your Review (0)</h1>
        <Separator />
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl mb-5">Your Review ({reviews.length})</h1>
      <Separator />
      <div className="grid sm:grid-cols-2 gap-5 mt-10">
        {reviews?.map((item) => {
          const reviewInfo = {
            comment: item.comment,
            rating: item.rating,
            name: item.product.name,
            image: item.product.image,
            clerkId: item.clerkId,
            id: item.id,
            pathName: `/products/${item.product.id}`
          }
          return <ReviewCard key={reviewInfo.id} reviewInfo={reviewInfo} />
        })}
      </div>
    </>
  )
}

export default MyReviews
