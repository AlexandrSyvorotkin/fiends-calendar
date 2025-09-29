import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { Button } from "../ui/button";
import { ColorPicker } from "../ui/color-picker";
import { Switch } from "../ui/switch";
import { UserCard } from "../user-card";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

const AppHeader = () => {
  const { user, removeUser } = useUser();
  const [color, setColor] = useState(user.color);
  const { updateUser } = useFirebaseUser();
  const onChangeColor = async (newColor: string) => {
    setColor(newColor);
    try {
      await updateUser(user.name, newColor);
      console.log("Цвет пользователя успешно обновлен");
    } catch (error) {
      console.error("Ошибка при обновлении цвета:", error);
      // Возвращаем предыдущий цвет в случае ошибки
      setColor(user.color);
    }
  };
  return (
    <div className="mb-4 sm:mb-8 text-center fade-in-up flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-2 sm:p-4">
      <UserCard />
      <div className="flex items-center gap-4">
        <Switch />
        <ColorPicker value={color} onChange={onChangeColor} />
        <Button onClick={() => removeUser()}>Выйти</Button>
      </div>
    </div>
  );
};

export { AppHeader };
