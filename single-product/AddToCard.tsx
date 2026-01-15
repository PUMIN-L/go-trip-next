"use client"
import { useState } from "react"
// import SelectProductAmount from "./SelectProductAmount"
// import { Mode } from "./SelectProductAmount"
// import FormContainer from "../form/FormContainer"
// import { SubmitButton } from "../form/Buttons"
// import { addToCartAction } from "@/utils/actions"
import { useAuth } from "@clerk/nextjs"
import FormContainer from "@/components/form/FormContainer"
import SelectProductAmount, { Mode } from "./SelectProductAmount"
import { Input } from "@/components/ui/input"
import ProductAmount from "./ProductAmount"
import { addToCartAction } from "@/utils/action"
import { SubmitButton } from "@/components/form/Buttons"
import { Product } from "@prisma/client"
// import { ProductSignInButton } from "../form/Buttons"
// import SelectProductAmount from "./SelectProductAmount"

function AddToCart({ product }: { product: Product }) {
  const [amount, setAmount] = useState(1)
  const { userId } = useAuth()
  const productId = product.id
  const prictProduct = product.price
  return (
    <div className="mt-4">
      {userId ? (
        <FormContainer action={addToCartAction}>
          <ProductAmount />
          <input type="hidden" name="productId" value={productId} />
          {/* <input type="hidden" name="amount" value={amount} /> */}
          <input type="hidden" name="priceProduct" value={prictProduct} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <div>AA</div>
        // <ProductSignInButton />
      )}
    </div>
  )
}
export default AddToCart
