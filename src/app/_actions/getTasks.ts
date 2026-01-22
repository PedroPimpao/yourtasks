"use server";
import { db } from "@/src/lib/prisma";
import { getServerSession } from "./get-server-session";

export const getTasks = async () => {
  const data = await getServerSession();

  if (!data?.user) {
    return [];
  }

  return db.task.findMany({
    where: {
      userId: data.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
