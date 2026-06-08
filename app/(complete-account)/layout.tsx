import { test } from "@/lib/auth-guard";



export default async function CompleteAccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await test();
  return (
    <main>
      {children}
    </main>
  )
}