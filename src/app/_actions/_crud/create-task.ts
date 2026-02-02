"use server";

import { db } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "../_auth/get-server-session";
import { getPriorityLevelUniqueTask } from "./update-priority-level";

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
  const priorityLevel = await getPriorityLevelUniqueTask({ currentPriority: params.priority })
  await db.task.create({
    data: {
      title: params.title,
      description: params.description,
      dueDate: params.dueDate,
      priority: params.priority,
      priorityLevel: priorityLevel || 3,
      userId: session.user.id,
    },
  });
  revalidatePath("/");
};
