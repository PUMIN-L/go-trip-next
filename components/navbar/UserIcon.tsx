"use client"
import { useUser } from "@clerk/nextjs"
import { ReloadIcon } from "@radix-ui/react-icons"
import { LuUser } from "react-icons/lu"

function UserIcon() {
  const { user, isLoaded } = useUser()
  const profileImage = user?.imageUrl

  if (!isLoaded) {
    return <ReloadIcon className=" animate-spin" />
  }

  if (user) {
    return (
      <img src={profileImage} className="w-12 h-12 rounded-full object-cover" />
    )
  }

  return <LuUser className="w-6 h-6 rounded-full text-foreground" />
}

export default UserIcon
