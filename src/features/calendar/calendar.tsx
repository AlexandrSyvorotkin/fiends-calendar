import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import ruLocale from "@fullcalendar/core/locales/ru";
import useCalendarView from "@/hooks/useCalendarView";
import { useRef } from "react";
import { useAllWeekends } from "@/hooks/useAllWeekends";
import { useWeekends } from "@/hooks/useWeekends";
import { useUser } from "@/hooks/useUser";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { initialView } = useCalendarView(calendarRef);
  const { user } = useUser();
  const { toggleWeekend } = useWeekends(user.name);
  const { weekendEvents } = useAllWeekends();
  // Преобразуем все выходные в события для календаря
  const events = weekendEvents.map((event) => ({
    title: event.userName,
    start: event.date,
    allDay: true,
    backgroundColor: event.userColor,
  }));

  return (
    <div
      className="bg-white rounded-2xl h-full shadow-xl border border-slate-200/50 overflow-hidden fade-in-up flex-1"
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
            <div className="text-xs font-bold text-black px-1 py-0.5 rounded-sm shadow-sm">
              {arg.event.title}
            </div>
          )}
          events={events}
        />
      </div>
    </div>
  );
};

export { Calendar };
