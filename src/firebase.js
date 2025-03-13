import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBz72PaTnXu2w9BDGeX0zoNq1ogi56S6K8",
  authDomain: "blog-4d6fc.firebaseapp.com",
  projectId: "blog-4d6fc",
  storageBucket: "blog-4d6fc.firebasestorage.app",
  messagingSenderId: "1005482204704",
  appId: "1:1005482204704:web:a0cc0c20c95f26d019a645",
  measurementId: "G-916BS42YGC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, provider };
