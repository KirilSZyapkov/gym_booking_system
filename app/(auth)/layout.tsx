
import { checkRegistration } from "@/lib/auth-guard";


export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 
  await checkRegistration();

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fff8f1_0%,#fffdf9_55%,#ffffff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-20 h-128 bg-[radial-gradient(circle_at_top_left,rgba(245,176,119,0.32),transparent_38%),radial-gradient(circle_at_top_right,rgba(255,230,206,0.92),transparent_34%)]" />
      <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
      {children}
    </main>
  );
}