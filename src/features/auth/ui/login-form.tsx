import { useUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Имя пользователя является обязательным" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const users = useUsers((state) => state.users);


  const onSubmit = form.handleSubmit((data) => {
    const found = users.find((u) => u.name === data.username);
    if (found) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          value: found,
          timestamp: Date.now(),
        })
      );
      setUser({
        name: found.name,
        color: found.color,
        weekends: found.weekends,
      });

      navigate("/calendar");
    }
  });
  
  return (
    <Form {...form}>
    <form
      onSubmit={onSubmit}
      className="space-y-6 flex flex-col items-center gap-4"
    >
      <div className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите ваше имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit"className="w-full ">Войти</Button>
    </form>
  </Form>
  );
};

export { LoginForm };