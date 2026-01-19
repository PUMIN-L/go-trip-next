import { IconButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import DeleteOrder from "@/components/order/DeleteOrder"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { deleteOrderAction, fetchAdminOrders } from "@/utils/action"

import { formatDate } from "@/utils/format"
import Link from "next/link"
async function SalesPage() {
  const orders = await fetchAdminOrders()

  return (
    <div>
      <Table>
        <TableCaption>Total orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { orderTotal, tax, createdAt, email, id } = order

            return (
              <TableRow key={order.id}>
                <TableCell>{email}</TableCell>
                <TableCell>
                  <Link
                    href={`/order-items/${id}`}
                    className="underline"
                  >{`${id.slice(0, 22)}. . .`}</Link>
                </TableCell>
                <TableCell>{orderTotal.toLocaleString()}</TableCell>
                <TableCell>{tax.toLocaleString()}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
                <TableCell>
                  <DeleteOrder orderId={id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default SalesPage
