import sidebarActions from "./src/components/sidebar.js";
import {addBooksActions, renderBooks, addBook} from "./src/components/book.js";
import {fetchPessoa} from "./src/firebase/data.js";

const books = JSON.parse(localStorage.getItem("books")) || [];

function main() {
    sidebarActions();
    renderBooks();
    addBooksActions();
    addBookBtn.onclick = addBook;
    
}

window.onload = main;


export default books