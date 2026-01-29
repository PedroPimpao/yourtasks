"use client";

import Image from "next/image";
import { DoorOpen, Github } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/src/lib/auth-client";
import Link from "next/link";

const SocialAuthOptions = () => {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const signInWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="flex cursor-pointer flex-row items-center justify-center gap-2"
        variant={"outline"}
        onClick={signInWithGoogle}
      >
        <Image src={"/google.svg"} alt="Google" height={18} width={18} />
        <p className="font-bold">Google</p>
      </Button>
      <Button
        className="flex cursor-pointer flex-row items-center justify-center gap-2"
        variant={"outline"}
        onClick={signInWithGithub}
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
