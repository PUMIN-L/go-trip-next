import { Card, CardContent, CardHeader } from "@/components/ui/card"

import Image from "next/image"
import Rating from "./Rating"
import Comment from "./Comment"
import { currentUser } from "@clerk/nextjs/server"
import { FaTrashAlt } from "react-icons/fa"
import { deleteReviewAction } from "@/utils/action"
import FormContainer from "@/components/form/FormContainer"
import { SubmitButton } from "@/components/form/Buttons"
import Link from "next/link"

type ReviewCardProps = {
  reviewInfo: {
    comment: string
    rating: number
    name: string
    image: string
    clerkId: string
    id: string
    pathName?: string
  }
  children?: React.ReactNode
  productId?: string
}

async function ReviewCard({
  productId,
  reviewInfo,
  children
}: ReviewCardProps) {
  const user = await currentUser()

  const OwnerReview = user?.id === reviewInfo.clerkId

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              src={reviewInfo.image}
              alt={reviewInfo.name}
              width={48}
              height={48}
              sizes="(max-width: 768px) 48px, 96px"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
              {reviewInfo.pathName ? (
                <Link href={reviewInfo.pathName}>
                  <h3 className="text-sm font-bold capitalize mb-1 ">
                    {reviewInfo.name}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-sm font-bold capitalize mb-1">
                  {reviewInfo.name}
                </h3>
              )}
              <Rating rating={reviewInfo.rating} />
            </div>
          </div>
          {OwnerReview && (
            <DeleteReview
              userId={user.id}
              reviewId={reviewInfo.id}
              productId={productId}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  )
}
export default ReviewCard

function DeleteReview({
  userId,
  reviewId,
  productId
}: {
  userId: string
  reviewId: string
  productId?: string
}) {
  return (
    <FormContainer action={deleteReviewAction}>
      <input type="text" name="userId" defaultValue={userId} hidden />
      <input type="text" name="reviewId" defaultValue={reviewId} hidden />
      <input type="text" name="productId" defaultValue={productId} hidden />
      <SubmitButton
        text={
          <div className="hover:text-red-700 text-red-500">
            <FaTrashAlt />
          </div>
        }
        className=" bg-transparent hover:bg-transparent text-primary"
        size="icon"
      />
    </FormContainer>
  )
}
