import Header from "../../_components/header";
import { getOneTask } from "../../_actions/getOneTask";
import { notFound, redirect } from "next/navigation";
import { Button } from "../../_components/ui/button";
import DateFormat from "../../_components/date-format";
import UpdateTaskDialog from "../../_components/update-task-dialog";
import UpdatePrioritySelect from "../../_components/update-priority-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/ui/dialog";
import { deleteTask } from "../../_actions/deleteTask";
import AlertTaskDialog from "../../_components/alert-task-dialog";
import { revalidatePath } from "next/cache";

interface TaskPageProps {
  params: {
    id: string;
  };
}

const TaskPage = async ({ params }: TaskPageProps) => {
  const { id } = await params;

  const task = await getOneTask(id);

  if (!task) {
    notFound();
  }

  const onDelete = async () => {
    "use server"
    await deleteTask({
      taskId: task.id,
    });
    revalidatePath('/')
    redirect('/')
  };

  return (
    <div className="relative min-h-screen">
      <Header />
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

        <Dialog>
          <DialogTrigger className="" asChild>
            <Button variant={"default"} className="w-[50%]">
              Iniciar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar tarefa</DialogTitle>
              <DialogDescription>
                Deseja mesmo iniciar a tarefa? Esta ação é irreversível
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row justify-between gap-2">
              <DialogClose className="" asChild>
                <Button variant={"outline"} className="w-[50%]">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose className="" asChild>
                <Button variant={"default"} className="w-[50%]">
                  Iniciar
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskPage;
