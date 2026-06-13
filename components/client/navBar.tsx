import { checForkUser } from "@/lib/auth-guard";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import NavLinks from "./navLinks";
import LogoutButton from "../shared/logoutButton";


export default async function NavBar() {
  const user = await checForkUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-h-11 items-center justify-between gap-3">

          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 rounded-lg outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-translate-y-0.5">
              <Dumbbell className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 xl:block hidden">
              <span className="block truncate text-sm font-semibold leading-5 tracking-normal text-foreground">
                Gym Booking
              </span>
              <span className="block truncate text-xs leading-4 text-muted-foreground">
                Train smarter
              </span>
            </span>
          </Link>

          <span className="sm:block hidden "><NavLinks /></span>

          <div className="flex shrink-0 items-center gap-2">
            {user ?

              "message" in user ? (
                <>
                  <Link href={`${user.message}`}>
                    <span className="max-w-36 truncate rounded-lg border border-red-500 bg-card px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 hover:text-red-800">
                      Complete Account registration!
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/profile/${user.id}`}>
                    <span className="max-w-36 truncate rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
                      {user.name || user.email || "Member"}
                    </span>
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <Link
                  href="/signin"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Sign in
                </Link>
              )}
          </div>
        </div>
        <span className="xl:hidden block"><NavLinks /></span>

      </nav>
    </header>
  )
}