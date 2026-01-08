"use client";
import { Menu } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { useSession } from "@/src/lib/auth-client";
// import Image from "next/image";
// import ProfileInfoCard from "./profile-info-card";
// import AuthCard from "./auth-card";

const Header = () => {
  // const { data } = useSession();
  return (
    <>
      <Card className="flex flex-row items-center justify-between p-4">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="cursor-pointer"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </Card>
    </>
  );
};

export default Header;
