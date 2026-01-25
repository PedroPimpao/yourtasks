import Header from "../../_components/header";
import { getOneTask } from "../../_actions/_crud/getOneTask";
import { notFound, redirect } from "next/navigation";
import DateFormat from "../../_components/date-format";
import UpdateTaskDialog from "../../_components/update-task-dialog";
import UpdatePrioritySelect from "../../_components/update-priority-select";
import { deleteTask } from "../../_actions/_crud/deleteTask";
import AlertTaskDialog from "../../_components/alert-task-dialog";
import { revalidatePath } from "next/cache";
import { startTask } from "../../_actions/change_task_status/start-task";
import { finishTask } from "../../_actions/change_task_status/finish-task";
import { Card } from "../../_components/ui/card";
import { getServerSession } from "../../_actions/_auth/get-server-session";

interface TaskPageProps {
  params: {
    id: string;
  };
}

const TaskPage = async ({ params }: TaskPageProps) => {
  const { id } = await params;
  const data = await getServerSession();

  const task = await getOneTask(id);

  if (!task || !data?.user) {
    notFound();
  }

  const onDelete = async () => {
    "use server";
    await deleteTask({
      taskId: task.id,
    });
    revalidatePath("/");
    redirect("/");
  };

  const onStart = async () => {
    "use server";
    await startTask({
      taskID: task.id,
    });
    revalidatePath(`/tasks/${task.id}`);
  };

  const onFinish = async () => {
    "use server";
    await finishTask({
      taskID: task.id,
    });
    revalidatePath(`/tasks/${task.id}`);
  };

  return (
    <div className="relative min-h-screen">
      <Header session={data} />
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
        <AlertTaskDialog
          dialogTitle="Excluir tarefa"
          dialogDescription="Deseja mesmo excluir a tarefa? Esta ação é irreversível"
          actionButtonLabel="Excluir"
          actionVariant={"destructive"}
          actionFunction={onDelete}
        />
        {task.isPending && (
          <AlertTaskDialog
            dialogTitle="Iniciar tarefa"
            dialogDescription="Deseja mesmo iniciar a tarefa? Esta ação é irreversível"
            actionButtonLabel="Iniciar"
            actionVariant={"default"}
            actionFunction={onStart}
          />
        )}
        {task.inProcess && (
          <AlertTaskDialog
            dialogTitle="Finalizar tarefa"
            dialogDescription="Deseja mesmo finalizar a tarefa? Esta ação é irreversível"
            actionButtonLabel="Finalizar"
            actionVariant={"default"}
            actionFunction={onFinish}
          />
        )}
      </div>
    </div>
  );
};

export default TaskPage;
