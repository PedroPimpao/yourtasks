import Header from "./_components/header";
import { Badge } from "./_components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import CreateTaskDialog from "./_components/create-task-dialog";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { getTasks } from "./_actions/getTasks";
import TaskCard from "./_components/task-card";


export default async function Home() {
  const data = await auth.api.getSession({
    headers: await headers()
  })

  const tasks = await getTasks()

  return (
    <>
      <Header />
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="font-bold">
            Olá, {data?.user ? data.user.name : "Visitante"}!
          </div>
          <div>
            <span className="capitalize">
              {format(new Date(), "EEEE, ", { locale: ptBR })}
            </span>
            <span className="">
              {format(new Date(), "d 'de' ", { locale: ptBR })}
            </span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </div>
        </div>
        <CreateTaskDialog />
      </div>

      <div className="flex flex-row items-center justify-around p-4">
        <Badge className="" variant={"outline"}>
          3 Pendentes
        </Badge>
        <Badge>0 Concluídos</Badge>
        <Badge className="bg-orange-400">0 Em andamento</Badge>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="">
          <Link href={`/tasks/${task.id}`}>
            <TaskCard key={task.id} taskTitle={task.title} taskPriority={task.priority}/>
          </Link>
        </div>
      ))}
    </>
  );
}
