import { signInWithGoogle, signOutGoogle } from "../firebase/auth.js";
import { getUser, fetchPessoa } from "../firebase/data.js";
import { renderBooks } from "./book.js";


export default function sidebarActions() {

    const openSidebar = document.querySelector("#openSideBarBtn");
    const closeSideBar = document.querySelector("#closeSideBarBtn");
    const sidebar = document.querySelector("#sidebar");
    const signIn = document.querySelector("#userPhoto");
    const signOut = document.querySelector("#signOutBtn");

    // Ações para abrir e fechar a sidebar
    openSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSidebar.classList.toggle("disable-button");
    });

    closeSideBar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSidebar.classList.toggle("disable-button");
    });
    
    // Ações para fazer login e logout
    signIn.addEventListener("click", async () => {
        await signInWithGoogle();
        getUser().then(async (user) => {
            signIn.setAttribute("src", user.photoURL);
            signOut.classList.toggle("disable");
            const books = await fetchPessoa(user.uid);
            console.log(books);
            renderBooks(books.favoriteBooks);
        });
    });

    signOut.addEventListener("click", () => {
        signOutGoogle();
        signIn.setAttribute("src","img/user-icon.png");
        signOut.classList.toggle("disable")
    });
}
