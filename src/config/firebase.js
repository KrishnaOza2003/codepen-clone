import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZShbD810UPnlCdRQ28hld0Z2dDcmTZ8I",
  authDomain: "code-pen-clone-6c304.firebaseapp.com",
  projectId: "code-pen-clone-6c304",
  storageBucket: "code-pen-clone-6c304.appspot.com",
  messagingSenderId: "403806332233",
  appId: "1:403806332233:web:a125fcf8a638b482fc6698",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
