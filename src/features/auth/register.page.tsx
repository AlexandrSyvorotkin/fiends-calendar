import { useEffect } from "react";
import { Link } from "react-router";
import { useUsers } from "@/hooks/useUsers";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { AuthLayout } from "@/features/auth/ui";
import { RegisterForm } from "./ui/register-form";

const RegisterPage = () => {

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
      form={<RegisterForm/>}
      cardFooter={
        <p className="text-slate-600">
          Уже есть аккаунт?{" "}
          <Link className="text-blue-500 hover:text-blue-600" to="/">
            Войти
          </Link>
        </p>
      }
    />
  );
};

export { RegisterPage };
