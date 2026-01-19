import SectionTitle from "@/components/home/SectionTitle"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { fetchUserOrders } from "@/utils/action"
import { formatDate } from "@/utils/format"
import Link from "next/link"

async function OrdersPage() {
  const orders = await fetchUserOrders()

  return (
    <>
      <SectionTitle text="My Orders" />

      <div>
        <Table>
          <TableCaption>Total orders : {orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                Order ID <small>(Click ID to see information)</small>
              </TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Tax</TableHead>

              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const { products, orderTotal, tax, createdAt, id } = order

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      href={`/order-items/${id}`}
                      prefetch
                      className="underline"
                    >{`${id.slice(0, 23)} . . .`}</Link>
                  </TableCell>
                  <TableCell>{orderTotal.toLocaleString()}</TableCell>
                  <TableCell>{tax.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
export default OrdersPage
