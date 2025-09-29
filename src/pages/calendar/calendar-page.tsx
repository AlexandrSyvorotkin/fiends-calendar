import { useUser } from "@/hooks/useUser";
import { useWeekends } from "@/hooks/useWeekends";
import { useAllWeekends } from "@/hooks/useAllWeekends";
import { AddWeekendDialog } from "@/components/add-weekend-dialog";
import { useState } from "react";
import { UserCard } from "@/components/user-card";
import { useNavigate } from "react-router";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/useUsers";
import { UserList } from "@/components/user-list";
import { UserListItem } from "@/components/user-list/user-list-item";
import { ColorPicker } from "@/components/ui/color-picker";
import { Switch } from "@/components/ui/switch";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Calendar } from "@/components/calendar";

const CalendarPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>("Выберите дату");
  const { toggleWeekend } = useWeekends(user.name);
  const { weekendEvents } = useAllWeekends();
  const [isOpen, setIsOpen] = useState(false);
  const { removeUser } = useUser();
  const { updateUser } = useFirebaseUser();
  const [color, setColor] = useState(user.color);
  const users = useUsers((state) => {
    return state.users;
  });
  const navigate = useNavigate();
  const userStorage = localStorage.getItem("user");
  if (userStorage === null) {
    navigate("/");
  }
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
    <div className="h-screen flex flex-col bg-blue-500 dark:bg-slate-900">
      <div className="w-full mx-auto flex flex-col flex-1 p-2 sm:p-4 gap-4">
        <div className="mb-4 sm:mb-8 text-center fade-in-up flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-2 sm:p-4">
          <UserCard />
          <div className="flex items-center gap-4">
            <Switch />
            <ColorPicker value={color} onChange={onChangeColor} />
            <Button onClick={() => removeUser()}>Выйти</Button>
          </div>
        </div>
        <div className="flex gap-8 w-full h-full mt-8">
          <UserList
            rendersUsers={() =>
              users.map((user) => <UserListItem key={user.id} user={user} />)
            }
          />
          <Tabs className="w-full" defaultValue="weekends">
            <TabsList>
              <TabsTrigger value="weekends">Выходные</TabsTrigger>
              <TabsTrigger value="work">Рабочие</TabsTrigger>
            </TabsList>
            <TabsContent value="weekends">
              <Calendar />
            </TabsContent>
            <TabsContent value="work">
              <div>Рабочие</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Weekend Dialog */}
        <AddWeekendDialog
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggleWeekend={toggleWeekend}
          events={weekendEvents}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          username={user.name}
        />
      </div>
    </div>
  );
};

export { CalendarPage };
