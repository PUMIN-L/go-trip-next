"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { useToast } from "@/hooks/use-toast"
import { addFavorite, deleteFavorite } from "@/utils/action"
import { usePathname } from "next/navigation"

function FavoriteForm({
  productId,
  userId,
  favoriteId
}: {
  productId: string
  userId: string
  favoriteId: string | null
}) {
  const [isfavorite, setIsFavorite] = useState(Boolean(favoriteId))
  const [favoriteIdState, setFavoriteIdState] = useState(favoriteId)
  const { toast } = useToast()
  const pathname = usePathname()

  const handleClickFavoriteToggle = async () => {
    setIsFavorite(!isfavorite)

    if (!isfavorite) {
      const result = await addFavorite({ productId, userId })
      if (result) {
        setFavoriteIdState(result.id)
        toast({ description: "Added favorite" })
      }
    }
    if (isfavorite) {
      if (typeof favoriteIdState === "string") {
        const result = await deleteFavorite({
          favoriteId: favoriteIdState,
          pathname
        })
        toast({ description: result })
      }
    }
  }

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={handleClickFavoriteToggle}
      >
        {isfavorite ? <FaHeart /> : <FaRegHeart />}
      </Button>
    </div>
  )
}

export default FavoriteForm
