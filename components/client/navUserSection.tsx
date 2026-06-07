"use client";
import { Client } from "@/drizzle/schemas/client-schema";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "../shared/logoutButton";
import { UserResult } from "@/lib/auth-guard";


export default function NavUserSection({ data }: { data: UserResult }) {
  const [user, setUser] = useState<null | Client>(null);

  useEffect(() => {
    if (!data || "message" in data) {
      setUser(null);
      return;
    };

    setUser(data.user);
  }, [data])

  return (
    <div className="flex shrink-0 items-center gap-2">
      {user ? (
        <>
          <Link href={`/profile/${user.id}`}>
            <span className="max-w-36 truncate rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              {user?.name}
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
  )
}