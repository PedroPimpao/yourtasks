"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { deleteUser } from "../../_actions/_auth/delete-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const deleteUserSchema = z
  .object({
    password: z.string().nonempty({ message: "Insira sua senha" }),
    confirmPassword: z.string().nonempty({ message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

type DeleteUserFormValues = z.infer<typeof deleteUserSchema>;

interface DeleteUserFormProps {
  closeFormDialog: () => void;
}

export const DeleteUserForm = ({ closeFormDialog }: DeleteUserFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<DeleteUserFormValues>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    password,
    confirmPassword,
  }: DeleteUserFormValues) => {
    if (!password) {
      toast.error("Insira sua senha", { position: "top-left" });
      return;
    }

    if (!confirmPassword) {
      toast.error("Confirme sua senha", { position: "top-left" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não se coincidem", { position: "top-left" });
      return;
    }

    try {
      const { success, message } = await deleteUser({
        password,
      });

      if (!success) {
        toast.error(message || "Erro ao excluir o usuário", {
          position: "top-left",
        });
        return;
      }

      toast.success("Usuário excluído com sucesso", { position: "top-left" });
      console.log("Usuário excluído com sucesso!");
      closeFormDialog();
      router.replace("/login");
    } catch (error) {
      const e = error as Error;
      toast.error("Erro ao excluir o usuário", { position: "top-left" });
      console.log(`Erro ao executar a ação: ${e.message}`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-row gap-2">
            <Button
              variant={"outline"}
              type="reset"
              className="flex-1"
              onClick={closeFormDialog}
            >
              Cancelar
            </Button>
            <Button
              variant={"destructive"}
              type="submit"
              className="flex-1"
              onClick={closeFormDialog}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 />
                  Excluindo
                </>
              ) : (
                "Excluir"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
