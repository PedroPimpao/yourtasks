"use client";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";
import ProfileInfoTrigger from "./profile-info-trigger";

const Header = () => {
  const { data } = useSession();

  return (
    <>
      <Card className="mt-0 flex flex-row items-center justify-between rounded-t-none p-4">
        <Link href={"/"}>
          <Logo />
        </Link>
        {data?.user ? (
          <ProfileInfoTrigger />
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
