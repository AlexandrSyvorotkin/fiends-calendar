import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import usersData from '@/users';

interface User {
  id: number;
  name: string;
  color: string;
}

export interface WeekendEvent {
  id: string;
  userId: number;
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
        const userId = Number(docSnap.id);
        const weekends: string[] = data.weekends || [];
        const userInfo = (usersData as User[]).find(u => u.id === userId);
        const name = userInfo ? userInfo.name : `User ${userId}`;
        const color = userInfo ? userInfo.color : '#FF5733';
        weekends.forEach(date => {
          events.push({
            id: `${userId}_${date}`,
            userId,
            userName: name,
            userColor: color,
            date,
          });
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