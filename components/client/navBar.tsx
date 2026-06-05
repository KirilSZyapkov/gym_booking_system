import LogoutButton from "../shared/logoutButton";
import { checForkUser } from "@/lib/auth-guard";

export default async function NavBar() {

  const user = await checForkUser();

  return (
    <nav className="flex justify-between items-center">Nav Bar {user?.id && <LogoutButton />}</nav>
  )
}