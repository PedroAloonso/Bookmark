import { getFirestore, collection, getDocs, getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import app from './config'; // Supondo que você já tenha a configuração do Firebase no arquivo config.js

// Obter a instância do Firestore
const db = getFirestore(app);
var bookData = [];


// TODO: Remover função de fetch de Pessoas do projeto final


// Para buscar os documentos da coleção 'pessoas'
const fetchPessoas = async () => {
    try {
        // Referência à coleção 'users'
        const pessoasCollection = collection(db, 'users');

        // Recupera os documentos da coleção
        const querySnapshot = await getDocs(pessoasCollection);

        // Processa os documentos retornados
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Erro ao buscar documentos:", error);
    }
};

// Para buscar os dados de um usuario em especifico específico
const fetchPessoa = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Nenhum dado encontrado para o usuário.");
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
        console.log("Usuário registrado com sucesso no Firestore.");
    } catch (error) {
        console.error("Erro ao registrar usuário no Firestore:", error);
    }
}

// Para atualizar um documento
const updateInDatabase = async (uid, data) => {
    try {
        await updateDoc(doc(db, "users", uid), data);
        console.log("Dados do usuário atualizados com sucesso no Firestore.");
    } catch (error) {
        console.error("Erro ao atualizar dados do usuário no Firestore:", error);
    }
}




// Chama a função para buscar os dados
export { fetchPessoa, updateInDatabase, addUserInDatabase };