"use client";
import z from "zod";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
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
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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

const CreateTaskForm = () => {
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
          <DialogClose className="flex w-full flex-row justify-around gap-2">
            <Button variant={"outline"} type="reset" className="w-[50%]">
              Cancelar
            </Button>
            <Button
              variant={"default"}
              type="submit"
              className="cursor-pointer w-[50%]"
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
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateTaskForm;
