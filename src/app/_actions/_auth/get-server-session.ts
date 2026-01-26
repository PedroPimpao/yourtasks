"use server";

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export const getServerSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  return data;
};
