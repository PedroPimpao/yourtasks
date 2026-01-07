import { Menu } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Header = () => {
  return (
    <>
      <Card className="flex flex-row items-center justify-between p-4">
        <Logo />
        <Button variant={"outline"} size={"icon"}>
          <Menu />
        </Button>
      </Card>
    </>
  );
};

export default Header;
