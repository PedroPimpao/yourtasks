"use server";

import { auth } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Desconectado com sucesso!",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Falha na desconexão",
    };
  }
};
