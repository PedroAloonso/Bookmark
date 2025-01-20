import { signInWithGoogle, signOutGoogle, getUser, auth } from "../firebase/auth.js";
import { fetchPessoa, addUserInDatabase } from "../firebase/data.js";
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
        try {
            const signInUser = await signInWithGoogle();
            const user = signInUser.user;
            const userInDB = await fetchPessoa(user.uid);
            if (!userInDB) {
                await addUserInDatabase(user.uid, {
                    displayName: user.displayName,
                    email: user.email,
                    creationTime: user.metadata.creationTime,
                    lastSignIn: user.metadata.lastSignInTime,
                    favoriteBooks: []
                });
                renderBooks([]);
            } else {
                renderBooks(userInDB.favoriteBooks);
                signIn.setAttribute("src", user.photoURL);
                signOut.classList.toggle("disable");
            }

        } catch (error) {
            console.log("Erro ao fazer login:", error);
        }


    });

    signOut.addEventListener("click", () => {
        signOutGoogle();
        signIn.setAttribute("src", "img/user-icon.png");
        signOut.classList.toggle("disable")
    });
}
