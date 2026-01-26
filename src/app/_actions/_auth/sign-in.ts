"use server";

import { auth } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface SignInProps {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
      headers: await headers(),
    });
    revalidatePath('/')
    return {
      success: true,
      message: "Signed In",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};
