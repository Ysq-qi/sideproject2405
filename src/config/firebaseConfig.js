import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH0IdVbwiymmXiKzRjWhahpNP9hvSnfX0",
  authDomain: "sideproject2405-b8a66.firebaseapp.com",
  projectId: "sideproject2405-b8a66",
  storageBucket: "sideproject2405-b8a66.appspot.com",
  messagingSenderId: "400473070839",
  appId: "1:400473070839:web:b9ad7f4d92a09eabc987f2",
  measurementId: "G-V61NE763GX"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// 設置關閉瀏覽器後即失效
setPersistence(auth, browserSessionPersistence)
  .catch((error) => {
    console.error('設定持久性失敗:', error);
  });

export { auth, db };