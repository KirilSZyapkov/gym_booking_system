import { auth } from "./auth";
import { redirect } from "next/navigation";
import { getClientByIdAction } from "@/actions/client.action";
import { headers } from "next/headers";
import { Client } from "@/drizzle/schemas/client-schema";

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

export type UserResult =
  | {
    success: true,
    user: Client
  }
  | {
    success: false,
    message: string
  }

export async function checForkUser(): Promise<UserResult> {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return {
      success: false,
      message: "No user found"
    };
  };

  const profile = await getClientByIdAction(session.user.id);

  if ("message" in profile) {
    return {
      success: false,
      message: profile.message
    }
  };

  return {
    success: true,
    user: profile
  };
}