"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { updatePassword } from "../../_actions/_auth/update-password";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, { message: `Mínimo de 8 caracteres` }),
    newPassword: z.string().min(8, { message: `Mínimo de 8 caracteres` }),
    confirmNewPassword: z
      .string()
      .min(8, { message: `Mínimo de 8 caracteres` }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: `As senhas não coincidem`,
    path: ["confirmNewPassword"],
  });

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordFormProps {
  closeDialog: () => void;
}

export const UpdatePasswordForm = ({
  closeDialog,
}: UpdatePasswordFormProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (formData: UpdatePasswordFormValues) => {
    const updatedPassword = await updatePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    });

    const result = updatedPassword.message
    const errorMessage = updatedPassword.errorMessage

    if(errorMessage){
      console.log(`Erro ao atualizar a senha: ${errorMessage}`)
    }
    
    alert(result)
    closeDialog();
    return updatedPassword
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha atual</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showCurrentPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showCurrentPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showNewPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showNewPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a nova senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Insira sua senha..."
                      type={showConfirmNewPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="absolute top-0 right-0 h-full px-3"
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                    >
                      {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                      <span className="sr-only">
                        {showConfirmNewPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full flex-row gap-3">
            <Button
              type="reset"
              variant={"outline"}
              className="flex-1"
              onClick={closeDialog}
            >
              Cancelar
            </Button>
            <Button variant={"default"} type="submit" className="flex-1">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 />
                  Atualizando
                </>
              ) : (
                "Atualizar"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
