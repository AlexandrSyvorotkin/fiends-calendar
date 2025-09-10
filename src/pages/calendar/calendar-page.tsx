import { useUser } from '@/hooks/useUser';
import { useWeekends } from '@/hooks/useWeekends';
import { useAllWeekends } from '@/hooks/useAllWeekends';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react"
import listPlugin from '@fullcalendar/list'
import { AddWeekendDialog } from '@/components/add-weekend-dialog';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router';
import { UserCard } from '@/components/user-card';


const CalendarPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>('Выберите дату');

  const calendarRef = useRef<FullCalendar | null>(null);
  const desktop = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      if (desktop) {
        calendarApi.changeView('dayGridMonth');
      } else {
        calendarApi.changeView('listMonth');
      }
    }
  }, [desktop]);

  const { toggleWeekend } = useWeekends(user.id);
  const { weekendEvents } = useAllWeekends();

  console.log(user)


  const navigate = useNavigate()
  // if (user.name === '') {
  //   navigate('/')
  // }


  // Преобразуем все выходные в события для календаря
  const events = weekendEvents.map(event => ({
    title: event.userName,
    start: event.date,
    allDay: true,
    backgroundColor: event.userColor,
  }));

  return <div className="min-h-screen p-4 bg-blue-500 dark:bg-slate-900">
    <div className="w-full mx-auto">
      <UserCard />
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="p-6">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
            initialView={desktop ? 'dayGridMonth' : 'listMonth'}
            weekends={true}
            dateClick={async (e) => {
              await toggleWeekend(e.dateStr)
            }}
            eventClick={async (e) => {
              await toggleWeekend(e.event.startStr)
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

      {/* Add Weekend Dialog */}
      <AddWeekendDialog
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        toggleWeekend={toggleWeekend}
        events={weekendEvents}
      />
    </div>
  </div>;
};

export { CalendarPage };