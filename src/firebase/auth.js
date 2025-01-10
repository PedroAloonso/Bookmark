import app from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup,  signOut, onAuthStateChanged} from 'firebase/auth';

// Inicializando o Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Função para fazer login com Google
const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error);
    }
};

// Função para fazer logout 
const signOutGoogle = async () => {
    if (auth.currentUser) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }  
}

export { signInWithGoogle, signOutGoogle, auth };
