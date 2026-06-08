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

 const clientRecord = await getClientByIdAction(session.user.id);

  if("message" in clientRecord){
    return {
      message: "/complete-account"
    }
  }

  return clientRecord;
}

export async function checkRegistration() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    const client = await getClientByIdAction(session.user.id);

    if (!client || "message" in client) {
      console.log(client.message);
      redirect("/complete-account");
    }

    redirect("/");
  };

}

export async function test() {
  const authUser = await requireUser();
  const clientRecord = await getClientByIdAction(authUser.id);

  if(!("message" in clientRecord)){
    redirect("/");
  }
}