import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Имя пользователя является обязательным" }),
  color: z.string().min(1, { message: "Цвет является обязательным" }),
});

const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={() => {}} className="space-y-6 flex flex-col items-center gap-4">
        <div className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше имя" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        </div>
      </form>
    </Form>
  );
};

export { RegisterForm };