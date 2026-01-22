import { useSession } from "@/src/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { User } from "lucide-react";
import ProfileInfoCard from "./profile-info-card";
import { Button } from "./ui/button";
import { signOut } from "../_actions/sign-out";

const ProfileInfoTrigger = () => {
  const { data } = useSession();
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="cursor-pointer">
            <AvatarImage />
            <AvatarFallback>
              {data?.user?.image ? (
                <Image
                  src={data?.user?.image ?? ""}
                  alt="User Image"
                  width={40}
                  height={40}
                />
              ) : (
                <User />
              )}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3 flex flex-col gap-3 p-4">
          <ProfileInfoCard />
          <Button variant={"outline"} className="cursor-pointer">
            Configurações
          </Button>
          <Button onClick={signOut} className="cursor-pointer">
            Sair da conta
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileInfoTrigger;
