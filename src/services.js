// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  getDoc,
  serverTimestamp,
  collectionGroup,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyCTrUfspNgDUR3J2bjVQ90eiR7H0DT_2cU",
//   authDomain: "lumix-91314.firebaseapp.com",
//   projectId: "lumix-91314",
//   storageBucket: "lumix-91314.appspot.com",
//   messagingSenderId: "1056319810172",
//   appId: "1:1056319810172:web:6122b0cfa5a13904b9b7f9",
//   measurementId: "G-CHXLDR4X8F",
// };

// production
const firebaseConfig = {
  apiKey: "AIzaSyCA2XNsLPvQJ8v7Au1NV6Lq9IbpkDvvot8",
  authDomain: "lumix-p.firebaseapp.com",
  projectId: "lumix-p",
  storageBucket: "lumix-p.appspot.com",
  messagingSenderId: "72870788708",
  appId: "1:72870788708:web:b51240ffd1b4a1a0566971",
  measurementId: "G-6EEXK7CTL1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export const colRef = (_colPath, isGroup = false) => {
  return isGroup ? collectionGroup(db, _colPath) : collection(db, _colPath);
};

export const checkExistingEmail = async (email) => {
  return await fetchSignInMethodsForEmail(auth, email);
};

export const backendRegist = async (email, pass) => {
  const userCreation = httpsCallable(functions, "onUserCreate");
  return await userCreation({ email: email, password: pass });
};

export const docReference = (_docPath) => {
  return doc(db, _docPath);
};

export const onSignUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const onResetPass = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const onLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onLogOut = async () => {
  return await signOut(auth);
};

export const currentTime = () => {
  return Timestamp.now();
};

export const createDocFromId = async (collection, docId, data) => {
  let docRef = doc(db, collection, docId);
  return await setDoc(docRef, data);
};

export const docRef = (_path) => {
  return doc(db, _path);
};
export const addDocument = async (colName, data) => {
  const colRef = collection(db, colName);
  return await addDoc(colRef, data);
};

export const getDocById = async (_path) => {
  const docRef = doc(db, _path);
  return await getDoc(docRef);
};

export const addOrUpdate = async (_path, _data) => {
  return await setDoc(docReference(_path), _data, { merge: true });
};

export const saveMediaToStorage = async (media, path) => {
  const storageRef = ref(storage, path);
  const response = await fetch(media);
  const blob = await response.blob();
  const task = await uploadBytesResumable(storageRef, blob);
  return await getDownloadURL(task.ref);
};
