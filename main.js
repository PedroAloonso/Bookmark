import sidebarActions from "./src/components/sidebar.js";
import { renderBooks, addBook } from "./src/components/book.js";
import { getUser } from "./src/firebase/auth.js";
import { getUserDataInDB } from "./src/firebase/data.js";

const books = JSON.parse(localStorage.getItem("books")) || [];


async function main() {
    try {
        sidebarActions();
        const user = await getUser();
        if (user) {
            const userDB = await getUserDataInDB(user.uid);
            const favoriteBooks = userDB.favoriteBooks;
            renderBooks(favoriteBooks);
        } else {
            renderBooks();
        }
    } catch (error) {
        console.log(error);
    }
    addBookBtn.onclick = addBook;

}
window.onload = main;


export default books