"use server";
import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";

export const getTasks = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data?.user) {
    return [];
  }

  return db.task.findMany({
    where: {
      userId: data.user.id,
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
