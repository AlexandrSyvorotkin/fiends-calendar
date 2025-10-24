import { useEffect } from "react";
import { Link } from "react-router";
import { useUsers } from "@/hooks/useUsers";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { AuthLayout } from "@/features/auth/ui";
import { LoginForm } from "./ui/login-form";

const LoginPage = () => {

  const { getAllUsers } = useFirebaseUser();
  const { setUsers } = useUsers();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      console.log(users);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <AuthLayout
      title="Добро пожаловать"
      description="Войдите в систему управления выходными"
      form={<LoginForm />}
      cardFooter={
        <p className="text-slate-600">
          Нет аккаунта?{" "}
          <Link className="text-blue-500 hover:text-blue-600" to="/register">
            Зарегистрироваться
          </Link>
        </p>
      }
    />
  );
};

export { LoginPage };
