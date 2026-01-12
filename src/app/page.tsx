"use client";
import { useSession } from "../lib/auth-client";
import Header from "./_components/header";
import { defaultTasksData } from "./_constants/default-tasks-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Home() {
  // const date = new Date()
  const { data } = useSession();

  return (
    <>
      <Header />
      <div className="flex flex-col p-4">
        <div className="font-bold">Olá, {data?.user ? data.user.name : "Visitante"}!</div>
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

      {/* <div>{date.getDay()}</div> */}
      {defaultTasksData.map((task) => (
        <div key={task.id} className="border-b p-4">
          <h2 className="font-semibold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  );
}
