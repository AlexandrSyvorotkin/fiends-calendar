import { useMemo } from 'react';
import type { WeekendEvent } from './useAllWeekends';

export interface DateOption {
  value: string;
  label: string;
  isToday: boolean;
  hasEvent: boolean;
}

export const useDateOptions = (events: WeekendEvent[]) => {
  const dateOptions = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
      const isToday = day === today.getDate();
      const hasEvent = events.some(event => event.date === dateStr);
      
      return {
        value: dateStr,
        label: `${day} ${dayName} ${isToday ? '(сегодня)' : ''} ${hasEvent ? '✓' : ''}`.trim(),
        isToday,
        hasEvent
      };
    });
  }, [events]);

  return { dateOptions };
};
