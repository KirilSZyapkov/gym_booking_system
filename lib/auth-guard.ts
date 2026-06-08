import { auth } from "./auth";
import { redirect } from "next/navigation";
import { getClientByIdAction } from "@/actions/client.action";
import { headers } from "next/headers";

export async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/signin");
  };

  const profile = await getClientByIdAction(session.user.id);

  if ("message" in profile) {
    redirect("/complete-account");
  }
  return session.user;
}

export async function requireRole(roles: ("client" | "owner" | "admin" | "manager" | "staff")[]) {
  const user = await requireUser();
  const userClient = await getClientByIdAction(user.id);

  if ("message" in userClient) {
    redirect("/");
  };

  if (!roles.includes(userClient.role)) {
    console.log("Unauthorized atempt!");

    redirect("/");
  }

  return userClient;
}


export async function checForkUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return null;
  };

  return session.user;
}