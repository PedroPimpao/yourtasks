"use server";
import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "./get-server-session";

interface CreateTaskParams {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: string;
}

export const createTask = async (params: CreateTaskParams) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await db.task.create({
    data: {
      title: params.title,
      description: params.description,
      dueDate: params.dueDate,
      priority: params.priority,
      userId: session.user.id,
    },
  });
  revalidatePath("/");
};
