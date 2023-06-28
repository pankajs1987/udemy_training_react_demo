// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDMxER6hEyw5OVFKDYL3YjBO0vFej1Hnd8",
    authDomain: "dailytransactions-99473.firebaseapp.com",
    databaseURL: "https://dailytransactions-99473-default-rtdb.firebaseio.com",
    projectId: "dailytransactions-99473",
    storageBucket: "dailytransactions-99473.appspot.com",
    messagingSenderId: "270078990681",
    appId: "1:270078990681:web:14608aac2a608f8863d448",
    measurementId: "G-ZRVK3CHTJ5"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app,firebaseConfig.databaseURL);

export default app;