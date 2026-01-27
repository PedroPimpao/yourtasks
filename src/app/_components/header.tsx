"use client";

import Logo from "./logo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import ProfileInfoTrigger from "./profile-info-trigger";

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <>
      <Card className="mt-0 flex flex-row items-center justify-between rounded-t-none p-4">
        <Link href={"/"}>
          <Logo />
        </Link>
        {user ? (
          <ProfileInfoTrigger user={user} />
        ) : (
          <Link href={"/login"}>
            <Button className="cursor-pointer">Entrar</Button>
          </Link>
        )}
      </Card>
    </>
  );
};

export default Header;
