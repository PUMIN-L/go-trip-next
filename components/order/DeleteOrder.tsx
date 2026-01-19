"use client"
import { deleteOrderAction } from "@/utils/action"
import { IconButton } from "../form/Buttons"
import FormContainer from "../form/FormContainer"

function DeleteOrder({ orderId }: { orderId: string }) {
  const handleDeleteOrder = deleteOrderAction.bind(null, { orderId })
  return (
    <FormContainer action={handleDeleteOrder}>
      <IconButton
        actionType="delete"
        onClick={(e) => {
          if (!confirm("Delete this order?")) {
            e.preventDefault()
          }
        }}
      />
    </FormContainer>
  )
}

export default DeleteOrder
