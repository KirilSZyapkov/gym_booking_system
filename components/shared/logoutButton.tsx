"use client";

import { useRouter } from "next/navigation";
import { logoutUserAction } from "@/actions/user.action";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const isSuccess = await logoutUserAction();

    if (isSuccess) {
      router.refresh();
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive" className="cursor-pointer">Logout</Button>
  )
}