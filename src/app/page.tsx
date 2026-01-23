import Header from "./_components/header";
import Link from "next/link";
import CreateTaskDialog from "./_components/create-task-dialog";
import { getTasks } from "./_actions/getTasks";
import TaskCard from "./_components/task-card";
import DateFormat from "./_components/date-format";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./_components/ui/empty";
import { FolderCheck } from "lucide-react";
import { getServerSession } from "./_actions/get-server-session";
import TasksStats from "./_components/tasksStats";

export default async function Home() {
  const data = await getServerSession()
  const tasks = await getTasks();

  return (
    <>
      <Header session={data}/>
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col">
          <div className="font-bold">
            Olá, {data?.user ? data.user.name : "Visitante"}!
          </div>
          <DateFormat date={new Date()} />
        </div>
        {tasks.length > 0 && <CreateTaskDialog />}
      </div>
      <TasksStats/>

      <div className="border-b-2"></div>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Link href={`/tasks/${task.id}`} key={task.id}>
              <TaskCard
                key={task.id}
                taskTitle={task.title}
                taskPriority={task.priority}
                taskStatus={task.status}
                taskDueDate={task.dueDate}
              />
            </Link>
          ))}
        </div>
      ) : (
        <Empty className="flex items-center justify-center">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <FolderCheck />
            </EmptyMedia>
            <EmptyTitle>Sem tarefas</EmptyTitle>
            <EmptyDescription>
              Não há tarefas para exibir. Crie uma!
            </EmptyDescription>
          </EmptyHeader>
          <EmptyDescription>
            <CreateTaskDialog/>
          </EmptyDescription>
        </Empty>
      )}
    </>
  );
}
