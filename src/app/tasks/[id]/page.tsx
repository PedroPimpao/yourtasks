import Header from "../../_components/header";
import { Badge } from "../../_components/ui/badge";

interface TaskPageProps {
  params: {
    id: string;
  };
}

const TaskPage = ({ params }: TaskPageProps) => {
  return (
    <>
      <Header />
      <div className="w-full p-4">
        <h1>Task ID: Tem que ver no DB</h1>
        <h1 className="font-bold text-2xl border-b-2 p-2">Titulo</h1>
        {/* <p className="">Status: Pendente</p> */}
        <Badge variant={"outline"} className="">Pendente</Badge>
        <p>Descrição: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae totam molestiae nesciunt, asperiores enim, dolorem id minus!</p>
      </div>
    </>
  );
};

export default TaskPage;
