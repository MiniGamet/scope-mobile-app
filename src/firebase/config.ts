import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeTSPFQaBKXpPR9xxt9_C4fD3gmUlXXhA",
  authDomain: "scope-5988c.firebaseapp.com",
  projectId: "scope-5988c",
  storageBucket: "scope-5988c.appspot.com",
  messagingSenderId: "403094195594",
  appId: "1:403094195594:web:330f6d40e38364978b8c73",
  measurementId: "G-8B0PH8H3QY",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
