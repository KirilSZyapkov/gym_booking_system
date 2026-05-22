"use server";

import db from "@/drizzle/db";
import { createNewUserService } from "@/services/user.service";

type Params = {
  name: string,
  email: string,
  phone: string,
  password: string
}


export async function createNewUserAction(data: Params) {
  
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

 try {
  return await db.transaction(async(ctx)=>{
    const authUser = await createNewUserService(user);

    const client = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "client"
    };

    const client = await 
  })
 } catch (error: unknown) {
  
 }
};