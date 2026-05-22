import { auth } from "@/lib/auth";

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

  return response;
}