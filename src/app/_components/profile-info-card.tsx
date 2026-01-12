import { useSession } from "@/src/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { User } from "lucide-react";

const ProfileInfoCard = () => {
  const { data } = useSession();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-4">
          <Avatar>
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
          <div>
            <h2 className="font-bold">{data?.user?.name}</h2>
            <p className="text-muted-foreground text-sm">{data?.user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoCard;
