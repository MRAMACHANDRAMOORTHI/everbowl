import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3r0HtNAzHXKZxE5zbtpRGtWNGawZYCls",
  authDomain: "everbowl-437c2.firebaseapp.com",
  projectId: "everbowl-437c2",
  storageBucket: "everbowl-437c2.appspot.com",
  messagingSenderId: "158565514730",
  appId: "1:158565514730:web:e2ba4c762ede2475220693"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;