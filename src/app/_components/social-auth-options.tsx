"use client";

import Image from "next/image";
import { DoorOpen, Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  signInWithGoogle,
  signInWithGithub,
} from "../_actions/_auth/social-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SocialAuthOptions = () => {
  const router = useRouter();

  const onAuthGoogle = async () => {
    try {
      const { success, message } = await signInWithGoogle();
      if (!success) {
        toast.error(message || "Erro ao conectar", { position: "top-left" });
        return;
      }
      toast.success(message || "Conectado com sucesso!", {
        position: "top-left",
      });
      router.replace("/");
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao conectar: ${e.message}`);
      toast.error("[ERRO] Erro ao conectar. Tente novamente mais tarde", {
        position: "top-left",
      });
    }
  };

  const onAuthGithub = async () => {
    try {
      const { success, message } = await signInWithGithub();
      if (!success) {
        toast.error(message || "Erro ao conectar", { position: "top-left" });
        return;
      }
      toast.success(message || "Conectado com sucesso!", {
        position: "top-left",
      });
      router.replace("/");
    } catch (error) {
      const e = error as Error;
      console.log(`Erro ao conectar: ${e.message}`);
      toast.error("[ERRO] Erro ao conectar. Tente novamente mais tarde", {
        position: "top-left",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="flex cursor-pointer flex-row items-center justify-center gap-2"
        variant={"outline"}
        onClick={onAuthGoogle}
      >
        <Image src={"/google.svg"} alt="Google" height={18} width={18} />
        <p className="font-bold">Google</p>
      </Button>
      <Button
        className="flex cursor-pointer flex-row items-center justify-center gap-2"
        variant={"outline"}
        onClick={onAuthGithub}
      >
        <Github size={18} width={18} />
        <p className="font-bold">GitHub</p>
      </Button>
      <Link href={"/"} className="">
        <Button
          className="flex w-full flex-row items-center justify-center gap-2"
          variant={"outline"}
        >
          <DoorOpen />
          Entrar como visitante
        </Button>
      </Link>
    </div>
  );
};

export default SocialAuthOptions;
