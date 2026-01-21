import Header from "./_components/header";
import { Badge } from "./_components/ui/badge";
import Link from "next/link";
import CreateTaskDialog from "./_components/create-task-dialog";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { getTasks } from "./_actions/getTasks";
import TaskCard from "./_components/task-card";
import DateFormat from "./_components/date-format";
import { getStats } from "./_actions/get-stats";

export default async function Home() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const tasks = await getTasks();
  const tasksStats = await getStats();

  return (
    <>
      <Header />
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="font-bold">
            Olá, {data?.user ? data.user.name : "Visitante"}!
          </div>
          <DateFormat date={new Date()} />
        </div>
        <CreateTaskDialog />
      </div>

      <div className="flex flex-row items-center justify-around p-4">
        <Badge className="" variant={"outline"}>
          {tasksStats.pendingTasks} Pendentes
        </Badge>
        <Badge>{tasksStats.tasksCompleted} Concluídos</Badge>
        <Badge className="bg-orange-400">
          {tasksStats.tasksInProcess} Em andamento
        </Badge>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="">
          <Link href={`/tasks/${task.id}`}>
            <TaskCard
              key={task.id}
              taskTitle={task.title}
              taskPriority={task.priority}
            />
          </Link>
        </div>
      ))}
    </>
  );
}
