import { currentUser } from "@clerk/nextjs/server"
import LinksDropdownClient from "./LinkDropdownClient"

async function LinkDropdown() {
  const user = await currentUser()

  const isAdmin = user?.id === process.env.ADMIN_USER_ID
  return <LinksDropdownClient isAdmin={isAdmin} />
}

export default LinkDropdown
