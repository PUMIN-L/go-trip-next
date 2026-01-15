import CartItemsList from "@/components/cart/CartItemsList"
import CartTotals from "@/components/cart/CartTotals"
import SectionTitle from "@/components/home/SectionTitle"
import { fetchOrCreateCart, updateCart } from "@/utils/action"
import { SignedIn, SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

async function CartPage() {
  const { userId } = await auth()

  if (!userId) redirect("/")
  const previousCart = await fetchOrCreateCart(userId)
  if (!previousCart) redirect("/")

  const carthData = await updateCart(previousCart.id)

  if (!carthData) {
    redirect("/")
  }
  const { cartItems, currentCart } = carthData
  const cartId = currentCart.id
  if (cartItems.length === 0) {
    return <SectionTitle text="Empty cart" />
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} cartId={cartId} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  )
}
export default CartPage
