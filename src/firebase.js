import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuxOlpcMDesLIEGbFiKSYYZABow81xzek",
  authDomain: "restaurantai-9a89a.firebaseapp.com",
  projectId: "restaurantai-9a89a",
  storageBucket: "restaurantai-9a89a.firebasestorage.app",
  messagingSenderId: "45725586119",
  appId: "1:45725586119:web:897861b079fd7742c024e2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;