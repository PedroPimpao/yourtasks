"use server"

import { db } from "@/src/lib/prisma"
import { getServerSession } from "../_auth/get-server-session"

export const getPendingTasks = async () => {
    const data = await getServerSession()
    return db.task.findMany({
        where: {
            userId: data?.user.id,
            isPending: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}