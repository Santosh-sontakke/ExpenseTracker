import { Assets } from './../../node_modules/@react-navigation/elements/src/index';
// Import the necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAwEp0R8zTGMTylL8jzLcXQkr-TlCFxjxs",
  authDomain: "expense-tracker-app-d8a1f.firebaseapp.com",
  projectId: "expense-tracker-app-d8a1f",
  storageBucket: "expense-tracker-app-d8a1f.appspot.com",
  messagingSenderId: "254222270552",
  appId: "1:254222270552:android:0644f25cf3228e2058ca2d",
  databaseUrl: "https://expense-tracker-app-d8a1f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, database , firebaseConfig};


