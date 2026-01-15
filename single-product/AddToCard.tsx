"use client"

import FormContainer from "@/components/form/FormContainer"
import ProductAmount from "./ProductAmount"
import { addToCartAction } from "@/utils/action"
import { SubmitButton } from "@/components/form/Buttons"
import { Product } from "@prisma/client"
import { currentUser } from "@clerk/nextjs/server"

async function AddToCart({ product }: { product: Product }) {
  // const { userId } = useAuth()
  const user = await currentUser()

  const productId = product.id
  const prictProduct = product.price
  return (
    <div className="mt-4">
      {user ? (
        <FormContainer action={addToCartAction}>
          <ProductAmount />
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="priceProduct" value={prictProduct} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : null}
    </div>
  )
}
export default AddToCart
