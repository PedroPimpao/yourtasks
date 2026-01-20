"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { updatePriority } from "../_actions/update-task-priority";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UpdatePrioritySelectProps {
  taskIDProp: string
  currentPriority: string
}

const UpdatePrioritySelect = ({ taskIDProp, currentPriority }: UpdatePrioritySelectProps) => {
  const taskSchema = z.object({
    priority: z.string(),
  });

  type TaskFormValues = z.infer<typeof taskSchema>;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: currentPriority,
    },
  });

  return (
    <>
      <Form {...form}>
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={async (value) => {
                    field.onChange(value);

                    await updatePriority({
                      taskID: taskIDProp,
                      newPriority: value,
                    });
                  }}
                >
                  <SelectTrigger className="w-30">
                    <FormLabel className="capitalize"></FormLabel>
                    <SelectValue placeholder="Prioridade"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </>
  );
};

export default UpdatePrioritySelect;
