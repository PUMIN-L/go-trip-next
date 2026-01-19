import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import LoadingTable from "@/global/LoadingTable"
import { fetchOrderItems } from "@/utils/action"
import { formatDate } from "@/utils/format"
import Link from "next/link"
import { redirect } from "next/navigation"

async function page({ params }: { params: { id: string } }) {
  const getParams = await params
  const orderId = getParams.id

  if (!orderId) {
    redirect("/orders")
  }
  const orderItems = await fetchOrderItems(orderId)

  if (!orderItems) {
    return <p>Don't have</p>
  }

  return (
    <div>
      <h2 className="text-2xl  pb-5">Order Information</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trip</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>price</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((order) => {
            const tripName = order.product.name
            const tripId = order.product.id
            const amount = order.amount
            const tripePrice = order.product.price
            const date = order.createdAt
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    href={`/products/${tripId}`}
                    prefetch
                    className="underline"
                  >
                    {tripName}
                  </Link>
                </TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>{tripePrice}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
