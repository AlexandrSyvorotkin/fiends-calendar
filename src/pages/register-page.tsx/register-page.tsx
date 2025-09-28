import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";
import { ColorPicker } from "@/components/ui/color-picker";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { useUsers } from "@/hooks/useUsers";

const RegisterPage = () => {
  const users = useUsers(state => state.users);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { createUser } = useFirebaseUser();

  const [newUser, setNewUser] = useState({
    name: '',
    color: '#000000',
    weekends: []
  })

  const onCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(newUser.name, newUser.color);
      
      // // Сохраняем локально
      // users.push({
      //   id: newUser.name,
      //   name: newUser.name,
      //   color: newUser.color,
      //   weekends: newUser.weekends || []
      // });
      setUser(newUser);
      // Переходим на календарь
      navigate("/calendar");
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error && error.message === 'Пользователь с таким именем уже существует') {
        setError('Пользователь с таким именем уже существует. Пожалуйста, выберите другое имя.');
      } else {
        setError('Ошибка при создании пользователя. Попробуйте еще раз.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Добро пожаловать
          </h1>
          <p className="text-slate-600">
            Создайте пользователя
          </p>
        </div>

        <Card
          className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-8">
            <form
              onSubmit={onCreateUser}
              className="space-y-6 flex flex-col items-center gap-4"
            >
              <div className="space-y-2 w-full">
                <label className="text-sm font-medium text-slate-700">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>
              <div className='flex justify-start w-full'>
                <ColorPicker value={newUser.color} onChange={(color) => setNewUser({ ...newUser, color })} />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Создать пользователя
              </Button>

              {error && (
                <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate("/")}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage }