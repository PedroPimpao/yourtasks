import Header from "../../_components/header";
import { getOneTask } from "../../_actions/getOneTask";
import { notFound } from "next/navigation";
import { Button } from "../../_components/ui/button";
import DateFormat from "../../_components/date-format";
import UpdateTaskDialog from "../../_components/update-task-dialog";
import UpdatePrioritySelect from "../../_components/update-priority-select";

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
            <UpdatePrioritySelect taskIDProp={task.id} currentPriority={task.priority}/>
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
        <Button variant={"destructive"} className="w-[50%]">
          Excluir
        </Button>
        <Button className="w-[50%]">Iniciar</Button>
      </div>
    </div>
  );
};

export default TaskPage;
