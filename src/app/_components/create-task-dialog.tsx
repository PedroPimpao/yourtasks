import { Loader2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

const CreateTaskDialog = () => {
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  const closeCreateTaskDialog = () => {
    setCreateDialogIsOpen(false);
  };

  const taskSchema = z.object({
    title: z
      .string()
      .min(3, { message: "O título deve ter no mínimo 3 caracteres" }),
    description: z
      .string()
      .min(10, { message: "A descrição deve ter no mínimo 10 caracteres" }),
    dueDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  });

  type TaskFormValues = z.infer<typeof taskSchema>;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log("Creating task:", data);
  };
  return (
    <>
      <Dialog open={createDialogIsOpen} onOpenChange={setCreateDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus /> Nova Tarefa
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar tarefa</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insura o título da tarefa..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Insira a descrição da tarefa..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  disabled={{ before: new Date() }}
                />
              </div>
              <div className="flex w-full gap-2 flex-row">
                <DialogClose
                  className="flex w-full flex-row justify-around gap-2"
                  asChild
                >
                  <Button variant={"outline"} type="reset" className="w-[50%] cursor-pointer">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  variant={"default"}
                  type="submit"
                  className="w-[50%] cursor-pointer"
                  onClick={closeCreateTaskDialog}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 />
                      Cadastrando
                    </>
                  ) : (
                    "Criar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskDialog;
