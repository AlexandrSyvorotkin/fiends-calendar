import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { Button } from "../ui/button";
import { ColorPicker } from "../ui/color-picker";
import { Switch } from "../ui/switch";
import { UserCard } from "../user-card";
import { useUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";

const AppHeader = () => {
  const { user, removeUser, setColor } = useUser();
  const { updateUser, getAllUsers } = useFirebaseUser();
  const setUsers = useUsers((state) => state.setUsers);
  const [currentColor, setCurrentColor] = useState(user.color);
  
  const onChangeColor = async () => {
    console.log('onChangeColor')
    const previousColor = user.color;
    setColor(currentColor); // Используем текущий выбранный цвет
    try {
      await updateUser(user.name, currentColor);
      // После успешного обновления в Firebase обновляем список всех пользователей
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      console.log("Цвет пользователя успешно обновлен");
    } catch (error) {
      console.error("Ошибка при обновлении цвета:", error);
      setColor(previousColor); // Возвращаем предыдущий цвет в случае ошибки
      setCurrentColor(previousColor); // Также обновляем локальное состояние
    }
  };
  return (
    <div className="mb-4 sm:mb-8 text-center fade-in-up flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-2 sm:p-4">
      <UserCard />
      <div className="flex items-center gap-4">
        <Switch />
        <ColorPicker value={currentColor} onChange={setCurrentColor} onBlur={onChangeColor} />
        <Button onClick={() => removeUser()}>Выйти</Button>
      </div>
    </div>
  );
};

export { AppHeader };
