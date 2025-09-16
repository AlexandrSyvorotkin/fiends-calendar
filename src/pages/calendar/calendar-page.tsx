import { useUser } from '@/hooks/useUser';
import { useWeekends } from '@/hooks/useWeekends';
import { useAllWeekends } from '@/hooks/useAllWeekends';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react"
import listPlugin from '@fullcalendar/list'
import ruLocale from '@fullcalendar/core/locales/ru'
import { AddWeekendDialog } from '@/components/add-weekend-dialog';
import { useRef, useState } from 'react';
import { UserCard } from '@/components/user-card';
import useCalendarView from '@/hooks/useCalendarView';
import { useNavigate } from 'react-router';
import './calendar.css';


const CalendarPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>('Выберите дату');

  const calendarRef = useRef<FullCalendar | null>(null);
  const { initialView } = useCalendarView(calendarRef);

  const { toggleWeekend } = useWeekends(user.id);
  const { weekendEvents } = useAllWeekends();



  const navigate = useNavigate()
  if (user.name === '') {
    navigate('/')
  }


  // Преобразуем все выходные в события для календаря
  const events = weekendEvents.map(event => ({
    title: event.userName,
    start: event.date,
    allDay: true,
    backgroundColor: event.userColor,
  }));

  const [isOpen, setIsOpen] = useState(false);

  return <div className="h-screen flex flex-col bg-blue-500 dark:bg-slate-900">
    <div className="w-full mx-auto flex flex-col flex-1 p-2 sm:p-4 gap-4">
      <UserCard />
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden fade-in-up flex-1" style={{ animationDelay: '0.2s' }}>
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
              start: 'prev',
              center: 'title',
              end: 'next'
            }}
            buttonText={{
              today: 'Сегодня'
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            dateClick={async (e) => {
              await toggleWeekend(e.dateStr)
            }}
            eventClick={async (e) => {
              await toggleWeekend(e.event.startStr)
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

      {/* Add Weekend Dialog */}
      <AddWeekendDialog
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        toggleWeekend={toggleWeekend}
        events={weekendEvents}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  </div>;
};

export { CalendarPage };