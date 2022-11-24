import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



export const firebaseConfig = {
  apiKey: "AIzaSyAUliZuVEPe-yRUgDkWk4ZAmksN_hGMvmc",
  authDomain: "optativavii-22-4b847.firebaseapp.com",
  databaseURL: "https://optativavii-22-4b847-default-rtdb.firebaseio.com",
  projectId: "optativavii-22-4b847",
  storageBucket: "optativavii-22-4b847.appspot.com",
  messagingSenderId: "94434148357",
  appId: "1:94434148357:web:0952402542ac89d678dc6c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = getFirestore();
const db = firebase.firestore();


export default {
  firebase,
  db
};
