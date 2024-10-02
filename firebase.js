import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);      // entrar anonimamente
await signInAnonymously(auth);

const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "pessoas"));
querySnapshot.forEach((doc) => {
    console.log(doc.data().name);
    console.log(`${JSON.stringify(doc.data())}`);
});
