import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

const AuthCard = () => {
    return (
      <>
        <div className="flex flex-row items-center justify-around p-3">
          <h2>Faça seu login</h2>
          <Link href={"signup"}>
            <Button variant={"default"} className="cursor-pointer">
              <LogIn />
            </Button>
          </Link>
        </div>
      </>
    );
}
 
export default AuthCard;