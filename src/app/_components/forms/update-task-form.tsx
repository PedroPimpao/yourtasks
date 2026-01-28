"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { updateTask } from "../../_actions/_crud/update-task";
import { toast } from "sonner";

interface UpdateTaskFormProps {
  taskID: string;
  task: {
    title?: string;
    description?: string;
    dueDate?: Date;
  };
  closeDialog: () => void;
}

const UpdateTaskForm = ({ taskID, task, closeDialog }: UpdateTaskFormProps) => {
  const taskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z
      .date({
        message: "Data de vencimento inválida",
      })
      .optional(),
  });

  type TaskFormValues = z.infer<typeof taskSchema>;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task?.description,
      dueDate: task?.dueDate,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    const updateTaskFunction = await updateTask({
      taskProps: {
        id: taskID,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
      },
    });
    const { updatedTask, message, success, errorMessage } = updateTaskFunction
    if(!success){
      console.log(errorMessage)
      toast.error(message, { position: "top-left" })
    }
    toast.success(message, { position: "top-left" })
    closeDialog();
    return updatedTask
  };

  return (
    <>
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
          <div className="flex flex-col items-center justify-around gap-4">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mt-6">Data de vencimento</FormLabel>
                  <div className="flex justify-center">
                    <FormControl className="">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        disabled={{ before: new Date() }}
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-row gap-2">
            <DialogClose
              className="flex w-full flex-row justify-around gap-2"
              asChild
            >
              <Button
                variant={"outline"}
                type="reset"
                className="w-[50%] cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant={"default"}
              type="submit"
              className="w-[50%] cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 />
                  Atualizando...
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

export default UpdateTaskForm;
