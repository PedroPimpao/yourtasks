import Header from "../../_components/header";
import { getOneTask } from "../../_actions/_crud/getOneTask";
import { redirect } from "next/navigation";
import DateFormat from "../../_components/date-format";
import UpdateTaskDialog from "../../_components/update-task-dialog";
import UpdatePrioritySelect from "../../_components/update-priority-select";
import { TaskActions } from "../../_components/task-actions";
import { Card } from "../../_components/ui/card";
import { getServerSession } from "../../_actions/_auth/get-server-session";
import { getUser } from "../../_actions/_auth/get-user";

interface TaskPageProps {
  params: {
    id: string;
  };
}

const TaskPage = async ({ params }: TaskPageProps) => {
  const { id } = await params;
  const data = await getServerSession();
  const user = await getUser({ userID: data?.user.id });
  const task = await getOneTask(id);

  if (!task || !data?.user) {
    redirect('/')
  }

  return (
    <div className="relative min-h-screen">
      <Header user={user} />
      <div className="m-3">
        <div className="flex flex-row justify-between border-b pb-3">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex flex-row gap-2">
            <UpdateTaskDialog
              task={{
                id: task.id,
                title: task.title,
                description: task.description || "",
                dueDate: task?.dueDate || undefined,
              }}
            />
            <Card className="flex justify-center rounded-md p-1 py-0 pr-3 pl-3 text-sm text-nowrap capitalize">
              {task.status}
            </Card>
            <UpdatePrioritySelect
              taskIDProp={task.id}
              currentPriority={task.priority}
            />
          </div>
        </div>
        <div className="border-b p-3">
          <h2 className="mt-2 font-semibold">Descrição:</h2>
          <p className="text-justify">{task.description}</p>
        </div>
        <div className="border-b p-3">
          {task.dueDate && <DateFormat date={task.dueDate} />}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex w-full flex-row items-center justify-center gap-2 p-3">
        <TaskActions
          dialogTitle="Excluir tarefa"
          dialogDescription="Deseja mesmo excluir a tarefa? Esta ação é irreversível"
          actionButtonLabel="Excluir"
          actionVariant={"destructive"}
          action="delete"
          taskID={task.id
          }
        />
        {task.isPending && (
          <TaskActions
            dialogTitle="Iniciar tarefa"
            dialogDescription="Deseja mesmo iniciar a tarefa? Esta ação é irreversível"
            actionButtonLabel="Iniciar"
            actionVariant={"default"}
            action="start"
            taskID={task.id}
          />
        )}
        {task.inProcess && (
          <TaskActions
            dialogTitle="Finalizar tarefa"
            dialogDescription="Deseja mesmo finalizar a tarefa? Esta ação é irreversível"
            actionButtonLabel="Finalizar"
            actionVariant={"default"}
            action="finish"
            taskID={task.id}
          />
        )}
      </div>
    </div>
  );
};

export default TaskPage;
