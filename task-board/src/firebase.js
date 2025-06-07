

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onDisconnect //  added this for user presence tracking in firebase 
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfopsPiTFBGpUWRk3RCgAhxJh41fMef6M",
  authDomain: "task-board-85494.firebaseapp.com",
  databaseURL: "https://task-board-85494-default-rtdb.firebaseio.com",
  projectId: "task-board-85494",
  storageBucket: "task-board-85494.firebasestorage.app",
  messagingSenderId: "724767394509",
  appId: "1:724767394509:web:6b7fde4c60eb5262b07784"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export everything needed for real-time data and  + presence
export { db, ref, set, onValue, onDisconnect };