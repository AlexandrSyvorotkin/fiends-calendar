import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBUcLzjs9qUb7q0YDCNAYHRvUwB3Sxif1o",
  authDomain: "weekends-club.firebaseapp.com",
  databaseURL: "https://weekends-club-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weekends-club",
  storageBucket: "weekends-club.firebasestorage.app",
  messagingSenderId: "930818077364",
  appId: "1:930818077364:web:c2619cdeb797da22159de1",
  measurementId: "G-1RTRW2YB60"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app) 