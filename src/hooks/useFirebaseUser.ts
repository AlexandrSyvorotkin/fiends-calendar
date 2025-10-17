import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "@/app/firebase";

export interface FirebaseUser {
  id: string;
  name: string;
  color: string;
  weekends: string[];
}

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

  const getAllUsers = async (): Promise<FirebaseUser[]> => {
    try {
      const usersCol = collection(db, "users")
      const usersSnapshot = await getDocs(usersCol)
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseUser[]
      return usersList
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error)
      return []
    }
  }

  return { createUser, updateUser, getAllUsers };
};
