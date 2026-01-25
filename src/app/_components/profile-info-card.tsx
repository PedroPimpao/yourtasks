import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { User } from "lucide-react";

interface ProfileInfoCardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const ProfileInfoCard = ({ user } : ProfileInfoCardProps) => {
  // const { data } = useSession();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {user.image ? (
                <Image
                  src={user.image}
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
            <h2 className="font-bold">{user.name}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoCard;
