import NavBar from "@/components/client/navBar";

export default function ClienLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <NavBar/>
      {children}
    </main>
  )
}