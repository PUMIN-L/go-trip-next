import Link from "next/link"
import { Button } from "../ui/button"
import { LuShoppingCart } from "react-icons/lu"
import { fetchOrCreateCart } from "@/utils/action"
import { currentUser } from "@clerk/nextjs/server"

async function CartButton() {
  const user = await currentUser()
  if (!user) {
    return null
  }
  const cart = await fetchOrCreateCart(user.id)

  return (
    <Button asChild variant="outline" className="relative">
      <Link href="/cart" prefetch>
        <LuShoppingCart />
        <span
          className="absolute -top-3 -right-3 rounded-full h-6 w-6 text-ms bg-amber-800 
        flex justify-center items-center text-white "
        >
          {cart?.numItemsInCart || 0}
        </span>
      </Link>
    </Button>
  )
}

export default CartButton
