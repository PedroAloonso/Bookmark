import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
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

const loginBtn = document.querySelector("#userPhoto");
const userPhoto = document.querySelector("#userPhoto");
const signOutBtn = document.querySelector("#signOutBtn");

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firebase Authentication
const auth = getAuth(app); 
//await signInAnonymously(auth); // entrar anonimamente

const provider = new GoogleAuthProvider();

function signInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
            const user = result.user;
            const photoURL = user.photoURL;
            signOutBtn.classList.toggle("disable")

            if (photoURL) {
                userPhoto.src = photoURL;
            }

            console.log(result)
            console.log("Usuário logado:", user);

             // Save user data to Firestore
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
                favoriteBooks: JSON.parse(localStorage.getItem("books")),
            };

            addDoc(collection(db, "users"), userData)
            .then(() => {
                console.log("User data saved successfully");
            })
            .catch((error) => {
                console.error("Error saving user data:", error);
            });
        })
        .catch((error) => {
            console.log("Erro ao logar:", error);
        });
}

function signOutUser() {
    signOut(auth)
        .then(() => {
            userPhoto.src = "./img/person-icon.png"
            console.log("User signed out successfully");
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
}


// const querySnapshot = await getDocs(collection(db, "pessoas"));
// querySnapshot.forEach((doc) => {
//     console.log(doc.data().name);
//     console.log(`${JSON.stringify(doc.data())}`);
// });

loginBtn.addEventListener("click", signInWithGoogle);
signOutBtn.addEventListener("click", signOutUser)
