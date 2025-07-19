import { useUser } from '@/hooks/useUser';
import { useWeekends } from '@/hooks/useWeekends';
import { useAllWeekends } from '@/hooks/useAllWeekends';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react"
import listPlugin from '@fullcalendar/list'
import { useNavigate } from 'react-router';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive'

const CalendarPage = () => {
  const { user } = useUser();

  
  const calendarRef = useRef<FullCalendar | null>(null);
  const desktop = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      if (desktop) {
        calendarApi.changeView('dayGridMonth');
      } else {
        calendarApi.changeView('listWeek');
      }
    }
  }, [desktop]);

  const { toggleWeekend } = useWeekends(user.id);
  const { weekendEvents } = useAllWeekends();

  console.log(user)

  

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

  return <div className="flex flex-col justify-center items-center w-full h-screen p-8">
    <div className="p-2 max-w-sm text-center rounded-lg" style={{ backgroundColor: user.color }}>
      <h2 className="text-white text-2xl font-bold">Привет! {user.name}</h2>
    </div>
    <div className="w-full h-full">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView={desktop ? 'dayGridMonth' : 'listWeek'}
        weekends={true}
        dateClick={async (e) => {
          await toggleWeekend(e.dateStr)
        }}
        eventClick={async (e) => {
          await toggleWeekend(e.event.startStr)
        }}
        eventContent={(arg) => (
          <div className="text-xs font-bold text-white">
            {arg.event.title}
          </div>
        )}
        events={events}
      />
    </div>
  </div>;
};

export { CalendarPage };