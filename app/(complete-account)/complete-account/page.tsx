import { test } from "@/lib/auth-guard";
import CompleteAccountForm from "@/components/client/complete_account_form";

export default async function CompleteAccountPage() {
  const authUser = await test();

  return (
    <CompleteAccountForm authUser={authUser} />
  )
}