export {auth as middleware} from "@/lib/auth";

export const config = {
  matcher: [
    "/appointment/:path*",
    "/profile/:path*",
    "/admin/:path*"

  ]
}