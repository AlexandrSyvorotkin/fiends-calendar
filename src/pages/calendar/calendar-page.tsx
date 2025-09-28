import { useUser } from "@/hooks/useUser";
import { useWeekends } from "@/hooks/useWeekends";
import { useAllWeekends } from "@/hooks/useAllWeekends";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import ruLocale from "@fullcalendar/core/locales/ru";
import { AddWeekendDialog } from "@/components/add-weekend-dialog";
import { useRef, useState } from "react";
import { UserCard } from "@/components/user-card";
import useCalendarView from "@/hooks/useCalendarView";
import { useNavigate } from "react-router";
import "./calendar.css";
import { Button } from "@/components/ui/button";
import { useUsers, useUsersSubscription } from "@/hooks/useUsers";
import { UserList } from "@/components/user-list";
import { UserListItem } from "@/components/user-list/user-list-item";
import { ColorPicker } from "@/components/ui/color-picker";
import { Switch } from "@/components/ui/switch";

const CalendarPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>("Выберите дату");
  const users = useUsers((state) => {
    // console.log('Current state users:', state.users);
    return state.users;
  });

  console.log(user)

  // Активируем подписку на изменения пользователей
  // useUsersSubscription();

  const calendarRef = useRef<FullCalendar | null>(null);
  const { initialView } = useCalendarView(calendarRef);

  const { toggleWeekend } = useWeekends(user.name);
  const { weekendEvents } = useAllWeekends();

  console.log(weekendEvents);

  const navigate = useNavigate();
  const userStorage = localStorage.getItem("user");
  if (userStorage === null) {
    navigate("/");
  }

  // Преобразуем все выходные в события для календаря
  const events = weekendEvents.map((event) => ({
    title: event.userName,
    start: event.date,
    allDay: true,
    backgroundColor: event.userColor,
  }));

  const [isOpen, setIsOpen] = useState(false);
  // const { updateUserColor } = useUserColor(user.id);
  const { removeUser } = useUser();
  return (
    <div className="h-screen flex flex-col bg-blue-500 dark:bg-slate-900">
      <div className="w-full mx-auto flex flex-col flex-1 p-2 sm:p-4 gap-4">
        <div className="mb-4 sm:mb-8 text-center fade-in-up flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-2 sm:p-4">
          <UserCard />
          <div className="flex items-center gap-4">
            <Switch/>
            <ColorPicker value={user.color} onChange={() => console.log('color changed')}/>
            <Button onClick={() => removeUser()}>Выйти</Button>
          </div>
        </div>
        <div className="flex gap-8 w-full h-full mt-8">
          <UserList rendersUsers={() => users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))} />
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden fade-in-up flex-1"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="h-full p-2 sm:p-6">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                initialView={initialView}
                weekends={true}
                height="100%"
                locale={ruLocale}
                firstDay={1}
                headerToolbar={{
                  start: "prev",
                  center: "title",
                  end: "next",
                }}
                buttonText={{
                  today: "Сегодня",
                }}
                titleFormat={{ year: "numeric", month: "long" }}
                dateClick={async (e) => {
                  await toggleWeekend(e.dateStr);
                }}
                eventClick={async (e) => {
                  await toggleWeekend(e.event.startStr);
                }}
                eventContent={(arg) => (
                  <div className="text-xs font-bold text-white px-1 py-0.5 rounded-sm shadow-sm">
                    {arg.event.title}
                  </div>
                )}
                events={events}
              />
            </div>
          </div>
        </div>

        {/* Add Weekend Dialog */}
        <AddWeekendDialog
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggleWeekend={toggleWeekend}
          events={weekendEvents}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userId={user.id}
        />
      </div>
    </div>
  );
};

export { CalendarPage };
