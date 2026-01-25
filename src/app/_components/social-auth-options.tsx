"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/src/lib/auth-client";

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
    </div>
  );
};

export default SocialAuthOptions;
