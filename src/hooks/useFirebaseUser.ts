import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useFirebaseUser = () => {
  const createUser = async (name: string, color: string) => {
    // Создаем документ с именем пользователя как ID
    const userRef = doc(db, "users", name);

    // Проверяем, существует ли уже пользователь с таким именем
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      throw new Error("Пользователь с таким именем уже существует");
    }

    // Сохраняем данные пользователя
    await setDoc(userRef, {
      id: name, // используем имя как ID пользователя
      name,
      color,
      weekends: [],
    });


    return {
      id: name,
      name,
      color,
    };
  };

  const updateUser = async (name: string, color: string) => {
    const userRef = doc(db, "users", name);
    await updateDoc(userRef, {
      color,
      name
    });
  };

  const subscribeToUsers = (callback: (users: any[]) => void) => {
    const usersRef = collection(db, "users");

    // Создаем подписку на изменения
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      // console.log('Firebase snapshot:', snapshot.docs.length, 'documents');
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log('Mapped users:', users);
      callback(users);
    });

    // Возвращаем функцию для отписки
    return unsubscribe;
  };

  return { createUser, subscribeToUsers, updateUser };
};
