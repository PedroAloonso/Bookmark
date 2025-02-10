import app from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';


// TODO: Remover função de fetch de Pessoas do projeto final
// TODO: Fazer uma maneira de diminuir a quantidade de requisições ao banco de dados
// TODO: Refazer a função de atualiza as informações das marcações de livros

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


export { signInWithGoogle, signOutGoogle, auth, getUser };
