import Image from "next/image";
import { Card } from "./ui/card";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

const SocialAuthOptions = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button className="flex cursor-pointer flex-row items-center justify-center gap-2" variant={"outline"}>
        <Image src={"/google.svg"} alt="Google" height={18} width={18} />
        <p className="font-bold">Google</p>
      </Button>
      <Button className="flex cursor-pointer flex-row items-center justify-center gap-2" variant={"outline"}>
        <Github size={18} width={18} />
        <p className="font-bold">GitHub</p>
      </Button>
    </div>
  );
};

export default SocialAuthOptions;
