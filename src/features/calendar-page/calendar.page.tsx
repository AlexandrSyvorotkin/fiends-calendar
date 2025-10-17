import { useUser } from "@/hooks/useUser";
import { useWeekends } from "@/hooks/useWeekends";
import { useAllWeekends } from "@/hooks/useAllWeekends";
import { AddWeekendDialog } from "@/features/add-weekend-dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./calendar.css";
import { useUsers } from "@/hooks/useUsers";
import { UserList } from "@/features/user-list";
import { UserListItem } from "@/features/user-list/user-list-item";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/shared/ui/tabs";
import { Calendar } from "@/features/calendar";
import { AppHeader } from "@/features/app-header";


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
            </TabsContent>
          </Tabs>
        </div>
        {/* <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-2 px-4'>
          <div className='flex justify-around items-center'>
            <button onClick={() => {}} className='flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              <CalendarDays size={24} />
              <span className='text-xs'>Календарь</span>
            </button>
            <button onClick={() => {}} className='flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              <Users size={24} />
              <span className='text-xs'>Друзья</span>
            </button>
            <button onClick={() => setIsOpen(true)} className='flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              <Plus size={24} />
              <span className='text-xs'>Добавить</span>
            </button>
            <button onClick={() => {}} className='flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              <Settings size={24} />
              <span className='text-xs'>Настройки</span>
            </button>
          </div>
        </div> */}

        {/* Add Weekend Dialog */}
        <AddWeekendDialog
          toggleWeekend={toggleWeekend}
          events={weekendEvents.filter((event) => event.userName === user.name)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          username={user.name}
        />
      </div>
    </div>
  );
};

export { CalendarPage };