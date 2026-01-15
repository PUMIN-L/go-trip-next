"use client"
import FormContainer from "@/components/form/FormContainer"
import ProductAmount from "./ProductAmount"
import { addToCartAction } from "@/utils/action"
import { SubmitButton } from "@/components/form/Buttons"
import { Product } from "@prisma/client"

import { SignInButton, useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
function AddToCart({ product }: { product: Product }) {
  const { userId } = useAuth()

  const productId = product.id
  const prictProduct = product.price
  return (
    <div className="mt-4">
      {userId ? (
        <FormContainer action={addToCartAction}>
          <ProductAmount />
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="priceProduct" value={prictProduct} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <SignInButton mode="modal">
          <Button asChild>
            <button className="  text-start cursor-pointer">
              Login for buy our trip
            </button>
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
export default AddToCart
