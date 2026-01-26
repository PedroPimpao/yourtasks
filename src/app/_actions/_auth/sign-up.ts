"use server";

import { auth } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpProps) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
      headers: await headers()
    });
    revalidatePath('/')
    return {
      success: true,
      message: "Cadastrado com sucesso!",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Algo deu errado =(",
    };
  }
};
