"use server";

import db from "@/drizzle/db";
import { createNewUserService } from "@/services/user.service";
import { createNewClientAction } from "./client.action";

type Params = {
  name: string,
  email: string,
  phone: string,
  password: string
};




export async function createNewUserAction(data: Params) {

  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  try {

    const authUser = await createNewUserService(user);

    if (!authUser.user) {
      throw new Error("User creation failed!");
    };

    const client = {
      id: authUser.user.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "client" as const,
    };

    const newClient = await createNewClientAction(client);

    return newClient;

  } catch (error: unknown) {
    return {
      success: false,
      error: "Registration failed",
    };
  }
};