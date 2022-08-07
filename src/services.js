// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTrUfspNgDUR3J2bjVQ90eiR7H0DT_2cU",
  authDomain: "lumix-91314.firebaseapp.com",
  projectId: "lumix-91314",
  storageBucket: "lumix-91314.appspot.com",
  messagingSenderId: "1056319810172",
  appId: "1:1056319810172:web:6122b0cfa5a13904b9b7f9",
  measurementId: "G-CHXLDR4X8F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const onSignUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const onLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onLogOut = async () => {
  return await signOut(auth);
};
