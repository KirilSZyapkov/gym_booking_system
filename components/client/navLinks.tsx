"use client";

import { cn } from "@/lib/utils";
import { CalendarPlus, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Overview",
    icon: Home,
  },
  {
    href: "/appointment",
    label: "New appointment",
    icon: CalendarPlus,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-1 sm:w-fit">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-background hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive &&
                "bg-background text-foreground shadow-xs ring-1 ring-border/70"
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
