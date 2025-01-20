import app from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';


// TODO: Remover função de fetch de Pessoas do projeto final
// TODO: Fazer a função de remover um livro da lista de favoritos no banco de dados

// Inicializando o Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Função para fazer login com Google
const signInWithGoogle = async () => {
    try {
        return await signInWithPopup(auth, provider);
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

// Função para pegar o usuário logado no momento
const getUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject(0);
            }
        });
    });
}


//console.log(getUser());

export { signInWithGoogle, signOutGoogle, auth, getUser };
