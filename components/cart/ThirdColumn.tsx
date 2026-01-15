"use client"
import { useState } from "react"
// import SelectProductAmount from "../single-product/SelectProductAmount"
// import { Mode } from "../single-product/SelectProductAmount"
import FormContainer from "../form/FormContainer"
import { SubmitButton } from "../form/Buttons"
// import { removeCartItemAction, updateCartItemAction } from "@/utils/actions"
import { useToast } from "@/hooks/use-toast"
import ProductAmount from "@/single-product/ProductAmount"
import { Value } from "@radix-ui/react-select"
import UpdateAmount from "./UpdateAmount"
import { removeCartItemAction, updateAmountInCartItem } from "@/utils/action"
import { useLoading } from "@/context/loading-context"
import { useDebouncedCallback } from "use-debounce"

function ThirdColumn({
  quantity,
  id,
  cartId
}: {
  quantity: number
  id: string
  cartId: string
}) {
  const [amount, setAmount] = useState(quantity)

  const { loading, setLoading } = useLoading()

  const handleUpdateAmount = useDebouncedCallback(async (value: number) => {
    setLoading(true)

    try {
      await updateAmountInCartItem({
        amount: value,
        cartItemId: id
      })
    } finally {
      setLoading(false)
    }
  }, 300)

  const handleAmountChange = async (value: number) => {
    setAmount(value)
    handleUpdateAmount(value)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <UpdateAmount amount={amount} setAmount={handleAmountChange} />

      <div className="">
        <FormContainer action={removeCartItemAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="cartId" value={cartId} />
          <SubmitButton
            size="sm"
            className="mt-4 bg-red-500 text-gray-2 hover:bg-red-700"
            text="remove Trip "
          />
        </FormContainer>
      </div>
    </div>
  )
}
export default ThirdColumn
