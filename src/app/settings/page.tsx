"use client";

import {
  ChevronLeft,
  FolderPen,
  KeyRound,
  Mail,
  SunMoon,
  UserX,
} from "lucide-react";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import SettingActionItem from "../_components/setting-action-item";
import { ThemeSelect } from "../_components/theme-select";
import { verifyEmail } from "../_actions/_auth/verify-email";
import { getServerSession } from "../_actions/_auth/get-server-session";
import UpdateUsernameDialog from "../_components/update-username-dialog";
import { UpdatePasswordDialog } from "../_components/update-password-dialog";
import { useEffect, useState } from "react";
import DeleteUserFlow from "../_components/delete-user-flow";
import { useRouter } from "next/navigation";
import ChangeEmailDialog from "../_components/change-email-dialog";

const SettingsPage = () => {
  const [emailIsVerified, setEmailIsVerified] = useState<boolean | null>(null);
  const router = useRouter()
  
  useEffect(() => {
    const loadSession = async () => {
      const res = await fetch("/api/session");
      const data = await res.json();
      if(!data || !data.user){
        router.replace('/')
      }
      setEmailIsVerified(data?.user?.emailVerified ?? false);
    };
    loadSession();
  }, [router]);

  const onVerify = async () => {
    const data = await getServerSession();
    if (data?.user.emailVerified) {
      return;
    }
    if (data?.user) {
      await verifyEmail(data.user.email);
    }
  };

  return (
    <>
      <div className="relative flex w-full items-center justify-center border-b p-4">
        <Link href={"/"}>
          <Button
            size={"icon"}
            variant={"outline"}
            className="absolute top-0 left-0 m-4"
          >
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Configurações</h1>
      </div>

      <div className="mr-5 ml-5 grid grid-cols-1 content-center gap-5 object-center p-4 md:grid-cols-2">
        <SettingActionItem
          title="Redefinir nome de usuário"
          description="Você pode trocar o seu nome de usuário"
          icon={<FolderPen />}
          action={<UpdateUsernameDialog />}
        />

        <SettingActionItem
          title="Redefinir email"
          description="Você pode redefinir o endereço de email cadastrado"
          icon={<Mail />}
          action={<ChangeEmailDialog/>}
        />

        <SettingActionItem
          title="Redefinir senha"
          description="Você pode redefinir a senha do perfil"
          icon={<KeyRound />}
          action={<UpdatePasswordDialog />}
        />

        {!emailIsVerified ? (
          <SettingActionItem
            title="Verificação de email (Recomendado)"
            description="Conclua está ação para garantir que tem acesso ao email cadastrado"
            icon={<Mail />}
            action={
              <Button variant={"outline"} onClick={onVerify}>
                Verificar
              </Button>
            }
          />
        ) : (
          <SettingActionItem title="Email verificado" icon={<Mail />} />
        )}

        <SettingActionItem
          title="Excluir perfil"
          description="[CUIDADO] Exclua seu perfil permanentemente"
          icon={<UserX />}
          type="danger"
          action={<DeleteUserFlow/>}
        />

        <SettingActionItem
          title="Seleção de temas"
          icon={<SunMoon />}
          action={<ThemeSelect />}
        />
      </div>
    </>
  );
};

export default SettingsPage;
