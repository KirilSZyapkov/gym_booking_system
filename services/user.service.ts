import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type UserSchema= {
  name: string,
  email: string,
  password: string
}

export async function createNewUserService(data: UserSchema) {

  const response = await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password
    }
  });

  if(!response?.user){
    throw new Error("USER_CREATION_FAILED");
  };

  return response.user;
};

export async function loginUserService({email, password}: { email: string, password: string }) {
  const response = await auth.api.signInEmail({
    body: {email, password}
  });

  return response;
}

export async function logoutUserService() {
  await auth.api.signOut({
    headers: await headers(),
  });
  return {success: true}
}
