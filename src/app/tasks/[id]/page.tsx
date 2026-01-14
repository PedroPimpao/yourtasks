import Header from "../../_components/header";
import { Badge } from "../../_components/ui/badge";
import { getOneTask } from "../../_actions/getOneTask";
import { notFound } from "next/navigation";

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
    <>
      <Header />
      <div className="w-full p-4">
        <h1 className="border-b-2 p-2 text-2xl font-bold">{task?.title}</h1>
        <Badge variant={"outline"} className="w-30 font-bold capitalize">
          {task?.priority}
        </Badge>
        <p>Descrição: {task?.description}</p>
      </div>
    </>
  );
};

export default TaskPage;
