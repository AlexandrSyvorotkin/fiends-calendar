import { create } from 'zustand';
import { useEffect } from 'react';
import { useFirebaseUser } from './useFirebaseUser';

interface User {
  id: string;
  name: string;
  color: string;
  weekends: string[];
}

interface UsersState {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUsers = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => {
    // console.log('Setting users:', users);
    set({ users });
  }
}));

// Хук для автоматической подписки на изменения
export const useUsersSubscription = () => {
  const setUsers = useUsers(state => state.setUsers);
  const { subscribeToUsers } = useFirebaseUser();

  useEffect(() => {
    const unsubscribe = subscribeToUsers((users) => {
      setUsers(users);
    });
    return () => unsubscribe();
  }, [setUsers, subscribeToUsers]);
};
