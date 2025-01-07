import app from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup,  signOut, onAuthStateChanged} from 'firebase/auth';

// Inicializa o Firebase

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error);
    }
};


const signOutGoogle = async () => {
    if (auth.currentUser) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }  
}

const getUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
}

export { signInWithGoogle, signOutGoogle, getUser };
