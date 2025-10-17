import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export const useWeekends = (userId: string) => {
  const [weekends, setWeekends] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchWeekends = async () => {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setWeekends(userSnap.data().weekends || []);
      } else {
        setWeekends([]);
      }
      setLoading(false);
    };
    fetchWeekends();
  }, [userId]);

  const addWeekend = async (date: string) => {
    const userRef = doc(db, 'users', userId);
    const newWeekends = [...weekends, date];
    await updateDoc(userRef, { weekends: newWeekends });
    setWeekends(newWeekends);
  };

  const removeWeekend = async (date: string) => {
    const userRef = doc(db, 'users', userId);
    const newWeekends = weekends.filter(d => d !== date);
    await updateDoc(userRef, { weekends: newWeekends });
    setWeekends(newWeekends);
  };

  const toggleWeekend = async (date: string) => {
    if (weekends.includes(date)) {
      await removeWeekend(date);
    } else {
      await addWeekend(date);
    }
  };

  return { weekends, loading, addWeekend, removeWeekend, toggleWeekend };
};