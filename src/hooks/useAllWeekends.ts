import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';


export interface WeekendEvent {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  date: string;
}

export const useAllWeekends = () => {
  const [weekendEvents, setWeekendEvents] = useState<WeekendEvent[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const usersRef = collection(db, 'users');
    const unsubscribe = onSnapshot(usersRef, (usersSnap) => {
      const events: WeekendEvent[] = [];
      usersSnap.forEach((docSnap) => {
        const data = docSnap.data();
        const userId = docSnap.id; // ID это имя пользователя
        const weekends: string[] = data.weekends || [];
        
        // Используем данные из Firestore напрямую
        const name = data.name || userId;
        const color = data.color || '#FF5733';
        
        weekends.forEach(date => {
          const event = {
            id: `${userId}_${date}`,
            userId,
            userName: name,
            userColor: color,
            date,
          };
          events.push(event);
        });
      });
      setWeekendEvents(events);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    weekendEvents,
    loading
  }
}