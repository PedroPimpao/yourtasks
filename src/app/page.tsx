"use client";
import { useSession } from "../lib/auth-client";
// import { db } from "../lib/prisma";
import Header from "./_components/header";
// import { Button } from "./_components/ui/button";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <Header />
      <div>Olá, {data?.user ? data.user.name : "Visitante"}!</div>
    </>
  );
}
