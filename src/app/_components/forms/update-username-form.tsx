"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateUserName } from "../../_actions/_auth/update-username";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getServerSession } from "../../_actions/_auth/get-server-session";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const updateUsernameSchema = z.object({
  newUsername: z.string().min(3, { message: "Mínimo de 3 caracteres" }),
});

type UpdateUsernameFormValues = z.infer<typeof updateUsernameSchema>;

interface UpdateUsernameFormProps {
  closeDialog: () => void;
}

export const UpdateUsernameForm = ({
  closeDialog,
}: UpdateUsernameFormProps) => {
  const form = useForm<UpdateUsernameFormValues>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      newUsername: "",
    },
  });

  const onSubmit = async (formData: UpdateUsernameFormValues) => {
    const data = await getServerSession();
    if (data?.user) {
      const userID = data?.user.id;
      try {
        const { success, errorMessage } = await updateUserName({
          userID,
          newUsername: formData.newUsername,
        });
        if (!success) {
          toast.error(errorMessage || "Erro ao atualizar o nome de usuário", {
            position: "top-left",
          });
          return;
        }
        toast.success("Nome de usuário atualizado com sucesso!", {
          position: "top-left",
        });
      } catch (error) {
        const e = error as Error;
        console.log(`Erro ao executar a ação: ${e.message}`);
        toast.error("Erro ao executar a ação", { position: "top-left" });
      }
    }
    closeDialog();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Novo nome de usuário</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Insira o novo nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-row gap-3">
            <Button
              type="reset"
              onClick={closeDialog}
              variant={"outline"}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
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
