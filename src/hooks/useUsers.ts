import { create } from 'zustand';

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
    set({ users });
  }
}));
