import { fetchFavorite } from "@/utils/action"
import { currentUser } from "@clerk/nextjs/server"
import FavoriteForm from "./FavoriteForm"

async function FavoriteToggleButton({
  productId,
  pathname
}: {
  productId: string
  pathname?: string
}) {
  const user = await currentUser()
  const userId = user?.id
  if (!userId) {
    return false
  }
  const favorite = await fetchFavorite({ productId, userId })

  const fevoriteId = !favorite ? null : favorite.id
  return (
    <FavoriteForm
      productId={productId}
      userId={userId}
      favoriteId={fevoriteId}
    />
  )
}

export default FavoriteToggleButton
