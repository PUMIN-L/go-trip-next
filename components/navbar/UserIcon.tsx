import { currentUser } from "@clerk/nextjs/server"
import { LuUser } from "react-icons/lu"

async function UserIcon() {
  const user = await currentUser()
  const profileImage = user?.imageUrl

  if (user) {
    return (
      <img src={profileImage} className="w-12 h-12 rounded-full object-cover" />
    )
  }

  return <LuUser className="w-6 h-6 rounded-full text-foreground" />
}

export default UserIcon
