import { auth } from "@/src/lib/auth";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { db } from "@/src/lib/prisma";
import { headers } from "next/headers";

const CreateTaskSummary = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    })

    const dbLastTaskCreated = await db.task.findFirst({
        where: {
            userId: data?.user.id 
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return ( 
        
        <Drawer open>
            <DrawerContent>
                <DrawerTitle>
                    Resumo da Tarefa
                </DrawerTitle>
                Título: {dbLastTaskCreated?.title}
                Descrição: {dbLastTaskCreated?.description}
                Nível de Prioridade: {dbLastTaskCreated?.priority}
                Data de vencimento: {dbLastTaskCreated?.dueDate?.getDate()}
            </DrawerContent>
        </Drawer>
     );
}
 
export default CreateTaskSummary;