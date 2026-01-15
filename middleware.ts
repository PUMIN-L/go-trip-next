import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser
} from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth()

  const isAdminUser = authObject?.userId === process.env.ADMIN_USER_ID
  if (isAdminRoute(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  if (!isPublicRoute(req) && !authObject.userId) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next|_not-found|favicon.ico).*)", "/(api|trpc)(.*)"]
}
