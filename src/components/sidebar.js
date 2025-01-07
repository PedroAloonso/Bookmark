import { signInWithGoogle, signOutGoogle, getUser } from "../firebase/auth.js";


export default function sidebarActions() {

    const openSidebar = document.querySelector("#openSideBarBtn");
    const closeSideBar = document.querySelector("#closeSideBarBtn");
    const sidebar = document.querySelector("#sidebar");
    const signIn = document.querySelector("#userPhoto");
    const signOut = document.querySelector("#signOutBtn");

    // Ação para abrir e fechar a sidebar
    openSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSidebar.classList.toggle("disable-button");
    });

    closeSideBar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSidebar.classList.toggle("disable-button");
    });
    
    // Ação para fazer login e logout
    signIn.addEventListener("click", async () => {
        await signInWithGoogle();
        getUser().then((user) => {
            signIn.setAttribute("src", user.photoURL);
            signOut.classList.toggle("disable");
        });
    });

    signOut.addEventListener("click", () => {
        signOutGoogle();
        signIn.setAttribute("src","img/user-icon.png");
        signOut.classList.toggle("disable")
    });
}
