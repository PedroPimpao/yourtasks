"use client";
import { useSession } from "../lib/auth-client";
// import { db } from "../lib/prisma";
import Header from "./_components/header";
import { defaultTasksData } from "./_constants/default-tasks-data";
// import { Button } from "./_components/ui/button";

export default function Home() {
  // const date = new Date()
  const { data } = useSession();

  return (
    <>
      <Header />
      <div className="p-4 font-bold">
        Olá, {data?.user ? data.user.name : "Visitante"}!
      </div>
      {/* <div>{date.getDay()}</div> */}
      {defaultTasksData.map((task) => (
        <div key={task.id} className="p-4 border-b">
          <h2 className="font-semibold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  );
}
