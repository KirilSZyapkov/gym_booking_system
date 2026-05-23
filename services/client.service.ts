import db from "@/drizzle/db";
import { client } from "@/drizzle/schemas/client-schema";

type Params = {
  id: string
  name: string,
  email: string,
  phone: string,
  role: "client" | "owner" | "admin" | "manager" | "staff",
}

export async function createNewClientService(data: Params) {

  const [newClient] = await db.insert(client).values(data).returning();

  if(!newClient){
    throw new Error("CLIENT_CREATION_FAILED");
  };

  return newClient;
  
}