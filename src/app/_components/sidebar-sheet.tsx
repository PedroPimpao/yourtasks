import AuthCard from "./auth-card";
import ProfileInfoCard from "./profile-info-card";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useSession } from "@/src/lib/auth-client";

const SidebarSheet = () => {
  const { data } = useSession();

  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-start p-4 text-2xl">
            Perfil
          </SheetTitle>
        </SheetHeader>

        {!data?.user ? <AuthCard /> : <ProfileInfoCard />}
      </SheetContent>
    </>
  );
};

export default SidebarSheet;
