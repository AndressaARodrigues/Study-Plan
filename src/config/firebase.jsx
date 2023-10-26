import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBLlos49CuahhTXNkOUA_8j3ujq_zf-Z-U",
  authDomain: "sistema-de-recomendacao-7c4d9.firebaseapp.com",
  projectId: "sistema-de-recomendacao-7c4d9",
  storageBucket: "sistema-de-recomendacao-7c4d9.appspot.com",
  messagingSenderId: "202045593128",
  appId: "1:202045593128:web:cb8aa487f2703f3f12c71d"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

export default app;