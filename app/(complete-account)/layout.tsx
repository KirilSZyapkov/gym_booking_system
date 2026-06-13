export default async function CompleteAccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-amber-50 via-white to-zinc-100 px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  )
}
