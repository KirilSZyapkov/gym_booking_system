"use server";

import { client } from "@/drizzle/schema";
import { createNewClientService, getClientByIdService, updateClientByIdService } from "@/services/client.service";

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
      success: false,
      message: "Faild to register new client!"
    }
  }
};

export async function getClientByIdAction(id: string) {
  try {
    const clientData = await getClientByIdService(id);

    return clientData;

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Faild to find the client!"
    }
  }
};

export async function updateClientByIdAction(id: string, data: Partial<typeof client.$inferSelect>) {
  try {
    const updatedClient = await updateClientByIdService(id, data);

    return updatedClient;
    
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Faild to update the client!"
    }
  }
}