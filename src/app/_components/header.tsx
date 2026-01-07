import { LogIn, Menu } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";

const Header = () => {
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
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex justify-start p-4 text-2xl">Perfil</SheetTitle>
            </SheetHeader>
            <div className="flex flex-row items-center justify-around p-3">
              <h2>Faça seu login</h2>
              <Link href={"signup"}>
                <Button variant={"default"} className="cursor-pointer">
                  <LogIn />
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </Card>
    </>
  );
};

export default Header;
