import { useUser } from "@/hooks/useUser";
import { useWeekends } from "@/hooks/useWeekends";
import { useAllWeekends } from "@/hooks/useAllWeekends";
import { AddWeekendDialog } from "@/components/add-weekend-dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./calendar.css";
import { useUsers } from "@/hooks/useUsers";
import { UserList } from "@/components/user-list";
import { UserListItem } from "@/components/user-list/user-list-item";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Calendar } from "@/components/calendar";
import { AppHeader } from "@/components/app-header";


const CalendarPage = () => {
  const { user } = useUser();
  
  const { toggleWeekend } = useWeekends(user.name);
  const { weekendEvents } = useAllWeekends();
  const [isOpen, setIsOpen] = useState(false);
  const users = useUsers((state) => {
    return state.users;
  });
  const navigate = useNavigate();
  const userStorage = localStorage.getItem("user");
  if (userStorage === null) {
    navigate("/");
  }
  

  return (
    <div className="h-screen flex flex-col bg-blue-500 dark:bg-slate-900">
      <div className="w-full mx-auto flex flex-col flex-1 p-2 sm:p-4 gap-4">
        <AppHeader />
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
