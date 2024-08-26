// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/database";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqhoCifi2L5Z_AvOOEstsTeh2NDvwxLlE",
  authDomain: "shopease-f3773.firebaseapp.com",
  projectId: "shopease-f3773",
  storageBucket: "shopease-f3773.appspot.com",
  messagingSenderId: "548415741551",
  appId: "1:548415741551:web:a9fdd82ada5b0751c4f79a",
  measurementId: "G-V1LKFFRRZ2",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export default auth;
