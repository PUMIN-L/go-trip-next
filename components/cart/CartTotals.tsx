import { Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
// import { createOrderAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"
import { SubmitButton } from "../form/Buttons"
import { Cart } from "@prisma/client"
import { CartSubmitButton } from "./CartSubmitButton"
import { createOrderAction } from "@/utils/action"

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart
  return (
    <div>
      <Card className="flex p-8 gap-0">
        <CartTotalRow label="Price" amount={cartTotal} />
        <CartTotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-5">
          <CartTotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <CartSubmitButton
          text="Pay now"
          className="w-full mt-8 bg-chart-2 text-white hover:bg-green-800"
        />
      </FormContainer>
    </div>
  )
}

function CartTotalRow({
  label,
  amount,
  lastRow
}: {
  label: string
  amount: number
  lastRow?: boolean
}) {
  return (
    <>
      <p className="flex justify-between text-sm ">
        <span>{label}</span>
        <span>{amount.toLocaleString("th-TH")}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  )
}

export default CartTotals
