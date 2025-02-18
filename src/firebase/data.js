import { getFirestore, collection, getDocs, getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import app from './config';

// Obter a instância do Firestore
const db = getFirestore(app);

// Para buscar os dados de um usuario em especifico no banco de dados
const getUserDataInDB = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Firestore:", error);
    }
}


// Para adicionar um usuario no banco de dados
const addUserInDatabase = async (uid, data) => {
    try {
        await setDoc(doc(db, "users", uid), data);
    } catch (error) {
        console.error("Erro ao registrar usuário no Firestore:", error);
    }
}

// Para atualizar um documento
const updateInDatabase = async (uid, data) => {
    try {
        await updateDoc(doc(db, "users", uid), data);
    } catch (error) {
        console.error("Erro ao atualizar dados do usuário no Firestore:", error);
    }
}




// Chama a função para buscar os dados
export { getUserDataInDB, updateInDatabase, addUserInDatabase };