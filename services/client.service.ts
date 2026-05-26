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

  const [newClient] = await db.insert(client).values(data).onConflictDoUpdate({
    target: client.id,
    set:{
      email: data.email,
      name: data.name,
      phone: data.phone
    }
  }).returning();

  if(!newClient){
    throw new Error("CLIENT_CREATION_FAILED");
  };

  return newClient;
  
};

export async function getClientByIdService(id:string) {
 
  const clientData = await db.query.client.findFirst({
    where: (client, {eq})=> eq(client.id, id),
    with: {
      appointments: true
    }
  });

  if(!clientData){
    throw new Error("CLIENT_NOT_FOUND");
  };

  return clientData;
}