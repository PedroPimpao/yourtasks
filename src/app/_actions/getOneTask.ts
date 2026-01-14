"use server";
import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const getOneTask = async (taskId: string) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

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
