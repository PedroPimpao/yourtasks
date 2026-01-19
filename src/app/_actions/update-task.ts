"use server"
import { db } from "@/src/lib/prisma"

interface UpdateTaskProps {
    taskProps: {
        id: string
        title?: string
        description?: string
        dueDate?: Date
        priority?: string
    }
}

export const updateTask = async ({ taskProps } : UpdateTaskProps) => {
    if(!taskProps){
        return
    }

    const updatedTask = await db.task.update({
      where: {
        id: taskProps.id,
      },
      data: Object.fromEntries(
        Object.entries({
          title: taskProps.title,
          description: taskProps.description,
          priority: taskProps.priority,
          dueDate: taskProps.dueDate,
        }).filter(([_,value]) => value !== undefined),
      ),
    });
    return updatedTask;
} 