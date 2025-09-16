import { useEffect, type RefObject } from "react";
import { useMediaQuery } from 'react-responsive';
import FullCalendar from "@fullcalendar/react";

const useCalendarView = (calendarRef: RefObject<FullCalendar | null>) => {
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
  }, [desktop, calendarRef]);

  return {
    initialView: desktop ? 'dayGridMonth' : 'listMonth'
  };
};

export default useCalendarView;