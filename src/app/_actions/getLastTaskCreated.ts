"use server";
import { db } from "@/src/lib/prisma";
import { getServerSession } from "./get-server-session";

export const getLastTaskCreated = async () => {
  const data = await getServerSession();

  const lastTask = await db.task.findFirst({
    where: {
      userId: data?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return lastTask;
};
