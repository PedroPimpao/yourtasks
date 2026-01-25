"use server";

import { auth } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers()
  });
  revalidatePath('/')
};
