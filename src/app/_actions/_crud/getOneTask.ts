"use server";
import { db } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "../_auth/get-server-session";

export const getOneTask = async (taskId: string) => {
  const data = await getServerSession();

  if (!data?.user) {
    notFound();
  }

  const task = db.task.findUnique({
    where: {
      userId: data.user.id,
      id: taskId,
    },
  });

  if (!task) {
    notFound();
  }

  return task;
};
