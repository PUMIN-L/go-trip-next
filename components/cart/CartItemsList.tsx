"use client"

import { Card } from "@/components/ui/card"
import { CartItemWithProduct } from "@/utils/types"
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemColumns"
import ThirdColumn from "./ThirdColumn"

function CartItemsList({
  cartItems,
  cartId
}: {
  cartItems: CartItemWithProduct[]
  cartId: string
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem
        const { image, name, country, price, id: productId } = cartItem.product

        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <div className="flex gap-10">
              <FirstColumn image={image} name={name} />
              <div className="sm:hidden">
                <ThirdColumn id={id} quantity={amount} cartId={cartId} />
              </div>
            </div>

            <SecondColumn name={name} country={country} productId={productId} />
            <div className="hidden">
              <ThirdColumn id={id} quantity={amount} cartId={cartId} />
            </div>

            <FourthColumn price={price} />
          </Card>
        )
      })}
    </div>
  )
}
export default CartItemsList
