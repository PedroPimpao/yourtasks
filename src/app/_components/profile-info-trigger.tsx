import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import ProfileInfoCard from "./profile-info-card";
import { Button } from "./ui/button";
import { signOut } from "../_actions/_auth/sign-out";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileInfoTriggerProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const ProfileInfoTrigger = ({ user }: ProfileInfoTriggerProps) => {
  const [dropDownOpen, setDropDownIsOpen] = useState(false);
  const router = useRouter();

  const closeDropDown = () => {
    setDropDownIsOpen(false);
  };

  const onSignOut = async () => {
    await signOut();
    closeDropDown();
    router.refresh();
  };

  return (
    <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownIsOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage />
          <AvatarFallback>
            {user.image ? (
              <Image src={user.image} alt="User Image" width={40} height={40} />
            ) : (
              <User />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 flex flex-col gap-3 p-4">
        <ProfileInfoCard user={user} />
        <Link href={"/settings"}>
          <Button variant={"outline"} className="w-full cursor-pointer">
            <Settings />
            Configurações
          </Button>
        </Link>
        <Button className="cursor-pointer" onClick={onSignOut}>
          <LogOut />
          Sair da conta
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfoTrigger;
