// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Basic Config object to initialize app
const firebaseConfig = {
  apiKey: "AIzaSyDR8VVEMp-NhtcTKHD-6CS7Pa6NOWAMHao",
  authDomain: "facerecognitionsystem-9930e.firebaseapp.com",
  databaseURL: "https://facerecognitionsystem-9930e-default-rtdb.firebaseio.com",
  projectId: "facerecognitionsystem-9930e",
  storageBucket: "facerecognitionsystem-9930e.appspot.com",
  messagingSenderId: "305671254296",
  appId: "1:305671254296:web:2d913f2f973dee0fce2e6d",
  measurementId: "G-4BDNL3EJ8T",
  databaseURL: "https://facerecognitionsystem-9930e-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firebase Database
const db = getDatabase(app);
// Initialize Firebase Storage
const storage = getStorage(app);

export { app, auth, db, storage };
