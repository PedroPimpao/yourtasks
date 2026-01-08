import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";

interface CreateTaskParams {
    title: string
    description: string
}

export const createTask = async (params: CreateTaskParams) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        throw new Error('Usuário não autenticado')
    }

    await db.task.create({
        data: {
            ...params, userId: session.user.id
        }
    })
}
