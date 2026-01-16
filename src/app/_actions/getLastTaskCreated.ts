"use server"
import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";

export const getLastTaskCreated = async () => {
  
  const data = await auth.api.getSession({
    headers: await headers()
  })
  
  const lastTask = await db.task.findFirst({
    where: {
      userId: data?.user.id
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return lastTask
};

