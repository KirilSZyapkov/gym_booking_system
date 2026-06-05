"use server";

import db from "@/drizzle/db";
import { createNewUserService, loginUserService, logoutUserService } from "@/services/user.service";
import { createNewClientAction } from "./client.action";
import { eq } from "drizzle-orm";
import { user } from "@/drizzle/schemas/auth-schema";
import { client } from "@/drizzle/schemas/client-schema";

type Params = {
  name: string,
  email: string,
  phone: string,
  password: string
};


export async function createNewUserAction(data: Params) {
  let authUser: typeof user.$inferSelect | undefined = undefined;

  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  try {

    const existing = await db.query.user.findFirst({
      where: eq(user.email, data.email)
    })

    if (!existing) {
      authUser = await createNewUserService(userData);
    };

    if (!authUser) {
      throw new Error("User creation failed!");
    };

    const client = {
      id: existing?.id ?? authUser.id,
      name: existing?.name ?? data.name,
      email: existing?.email ?? data.email,
      phone: data.phone,
      role: "client" as const,
    };

    const newClient = await createNewClientAction(client);

    return newClient;

  } catch (error: unknown) {
    return {
      success: false,
      error: "An account with these credentials already exists. Please sign in.",
    };
  }
};

export async function loginUserAction({email, password}: {email: string, password: string}) {
  try {
    const user = await loginUserService({email, password});

    const existing = await db.query.client.findFirst({
      where: eq(client.email, user.user.email),
    });

    return existing;
    
  } catch (error) {
     return {
      success: false,
      error: "Can not login! Please try again later.",
    };
  }
};

export async function logoutUserAction() {
  try {
    const res = await logoutUserService();

    return res.success;
    
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong!",
    };
  }
}