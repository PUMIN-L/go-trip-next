"use client"
import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import { Card } from "@/components/ui/card"
import TextAreaInput from "@/components/form/TextAreaInput"
import { useUser } from "@clerk/nextjs"
import RatingInput from "./RatingInput"
import { createReviewAction } from "@/utils/action"

function SubmitReview({ productId }: { productId: string }) {
  const { user } = useUser()
  return (
    <div>
      <Card className="p-5">
        <FormContainer action={createReviewAction}>
          <input type="hidden" name="productId" value={productId} />
          <input
            type="hidden"
            name="authorName"
            value={user?.firstName || "user"}
          />
          <input
            type="hidden"
            name="authorImageUrl"
            value={user?.imageUrl || ""}
          />
          <RatingInput name="rating" />
          <div className="mt-5">
            <TextAreaInput
              name="comment"
              labelText="feedback"
              placeholder="Write your feedback here."
              // defaultValue="Outstanding product!!!"
            />
          </div>

          <SubmitButton className="mt-4" />
        </FormContainer>
      </Card>
    </div>
  )
}

export default SubmitReview
