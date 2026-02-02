"use server"

import { db } from "@/src/lib/prisma"
import { getServerSession } from "../_auth/get-server-session"

export const getInProcessTasks = async () => {
    const data = await getServerSession()
    return db.task.findMany({
        where: {
            userId: data?.user.id,
            inProcess: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}