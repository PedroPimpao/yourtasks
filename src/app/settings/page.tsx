import { ChevronLeft, KeyRound, Mail, SunMoon } from "lucide-react";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import SettingActionItem from "../_components/setting-action-item";
import { ThemeSelect } from "../_components/theme-select";

const SettingsPage = () => {
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
          title="Redefinir email"
          description="Você pode trocar o endereço de email cadastrado"
          icon={<Mail />}
          action={<Button variant={"outline"}>Redefinir</Button>}
        />

        <SettingActionItem
          title="Redefinir senha"
          description="Você pode redefinir a senha do perfil"
          icon={<KeyRound />}
          action={<Button variant={"outline"}>Redefinir</Button>}
        />

        <SettingActionItem
          title="Verificação de email (Recomendado)"
          description="Conclua está ação para garantir que tem acesso ao email cadastrado"
          icon={<Mail />}
          action={<Button variant={"outline"}>Verificar</Button>}
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
