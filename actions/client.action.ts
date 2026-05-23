"use server";

import { createNewClientService } from "@/services/client.service";

type Params = {
  id: string
  name: string,
  email: string,
  phone: string,
  role: "client" | "owner" | "admin" | "manager" | "staff",
}

export async function createNewClientAction(data: Params) {
  try {
    const newClient = await createNewClientService(data);

    return newClient;

  } catch (error: unknown) {
    console.log(error);
    return {
      success: "Faild",
      message: "Faild to register new client!"
    }
  }
}