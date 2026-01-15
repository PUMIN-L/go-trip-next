import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { LuAlignLeft } from "react-icons/lu"
import UserIcon from "./UserIcon"
import {
  adminDropdownLinks,
  adminLinks,
  linksSignedIn,
  linksSignedOut
} from "@/utils/links"
import Link from "next/link"
import { useId } from "react"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton
} from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

async function LinksDropdown() {
  const id = useId()
  const user = await currentUser()
  const isAdmin = user && user.id == process.env.ADMIN_USER_ID

  return (
    <DropdownMenu>
      <DropdownMenuTrigger id={`${id}-actions`} asChild>
        {!user ? (
          <Button
            variant="outline"
            className="flex gap-4 max-w-25 cursor-pointer"
          >
            <LuAlignLeft />
            <UserIcon />
          </Button>
        ) : (
          <div className="cursor-pointer">
            <UserIcon />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 border  rounded-sm "
        align="end"
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem className="cursor-pointer">
            <SignInButton mode="modal">
              <button className=" w-full text-start cursor-pointer">
                Login
              </button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <SignUpButton mode="modal">
              <button className=" w-full text-start cursor-pointer ">
                Register
              </button>
            </SignUpButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {linksSignedOut.map((link) => {
            return (
              <DropdownMenuItem asChild id={link.href} key={link.id}>
                <Link
                  href={link.href}
                  prefetch
                  className="capitalize w-full cursor-pointer"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </SignedOut>

        <SignedIn>
          {!isAdmin &&
            linksSignedIn.map((link) => {
              return (
                <DropdownMenuItem asChild id={link.href} key={link.id}>
                  <Link
                    href={link.href}
                    prefetch
                    className="capitalize w-full cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              )
            })}

          {isAdmin &&
            adminDropdownLinks.map((link) => {
              return (
                <DropdownMenuItem asChild id={link.href} key={link.id}>
                  <Link
                    href={link.href}
                    prefetch
                    className="capitalize w-full cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          <DropdownMenuItem className="cursor-pointer">
            <SignOutButton>
              <button className="w-full text-start cursor-pointer ">
                Sign Out
              </button>
            </SignOutButton>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown

//////////////////////////////////////////////////////////////////////////////

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator
// } from "@/components/ui/dropdown-menu"
// import { LuAlignLeft } from "react-icons/lu"
// import Link from "next/link"
// import { Button } from "../ui/button"
// // import { links } from "@/utils/links"

// import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
// // import SignOutLink from "./SignOutLink"
// import UserIcon from "./UserIcon"
// import { auth } from "@clerk/nextjs/server"

// function LinksDropdown() {
//   //   const { userId } = auth()
//   //   const isAdmin = userId === process.env.ADMIN_USER_ID

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" className="flex gap-4 max-w-[100px] ">

//           <LuAlignLeft className="" />
//           <UserIcon />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-48" align="end" sideOffset={10}>
//         <SignedOut>
//           <DropdownMenuItem>
//             <SignInButton mode="modal">
//               <button className="w-full text-left">Login</button>
//             </SignInButton>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <SignUpButton mode="modal">
//               <button className="w-full text-left">Register</button>
//             </SignUpButton>
//           </DropdownMenuItem>

//           <DropdownMenuItem>
//             <Link href="/about" prefetch className="capitalize w-full">
//               {" "}
//               About{" "}
//             </Link>
//           </DropdownMenuItem>
//         </SignedOut>

//         <SignedIn>
//           {/* {links.map((link) => {
//             if (link.label === "dashboard" && !isAdmin) return null
//             return (
//               <DropdownMenuItem id={link.href}>
//                 <Link href={link.href} prefetch className="capitalize w-full">
//                   {link.label}
//                 </Link>
//               </DropdownMenuItem>
//             )
//           })} */}
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>{/* <SignOutLink /> */}</DropdownMenuItem>
//         </SignedIn>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

// export default LinksDropdown
