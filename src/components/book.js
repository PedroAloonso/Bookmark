import { getUser } from "../firebase/auth";
import { getUserDataInDB, updateInDatabase } from "../firebase/data";

const books = JSON.parse(localStorage.getItem("books")) || [];

import editIcon from "../img/edit-icon.png"
import deleteIcon from "../img/delete-icon.png"
import arrowLeftIcon from "../img/arrow-left-icon.png"
import arrowrightIcon from "../img/arrow-right-icon.png"

function Book(link, title, page) {
    return `
        <section class="book-card">
            <div class="book-title">
    
                <h2 class="title">
                    <a href="${link}">${title}</a>
                    <input type="text" value="${title}" class="disable editable title-input"/>
                </h2>                    
                    <input type="text" placeholder="Novo Link" class="disable link-input"/>
                   
            </div>
    
            <img
                src=${editIcon}
                alt="Editar"
                class="editBtn"
            />
            <img
                src=${deleteIcon}
                alt="Excluir"
                class="deleteBtn"
            />
    
            <div class="page-container">
                <h3>Página:</h3>
                <img src=${arrowLeftIcon} alt="Seta para esquerda" class="minusBtn"/>
                <p class="page">${page}</p>
                <img src=${arrowrightIcon} alt="Seta para direita" class="sumBtn" />
            </div>
        </section>
    `
}

// Salva 
const save = async (index) => {
    let title = document.querySelectorAll(".title input")[index].value;
    let link =
        document.querySelectorAll(".link-input")[index].value ||
        document.querySelectorAll(".title a")[index].href;
    let page = document.querySelectorAll(".page")[index].textContent;

    const user = await getUser();
    if (user) {
        const userDB = await getUserDataInDB(user.uid);
        let newFavoritesBooks = [...userDB.favoriteBooks];
        newFavoritesBooks[index] = { title, link, page };
        renderBooks(newFavoritesBooks);
        await updateInDatabase(user.uid, { favoriteBooks: newFavoritesBooks });
    } else {
        books[index] = { title, link, page };
        localStorage.setItem("books", JSON.stringify(books));
    }

}

// Cria um livro
const addBook = async () => {
    let title = `Titulo do livro`;
    let link = ``;
    let page = 1;

    let newBook = { title, link, page };

    try {
        const user = await getUser();
        if (user) {
            const userDB = await getUserDataInDB(user.uid);
            const newFavoritesBooks = [...userDB.favoriteBooks, newBook];
            renderBooks(newFavoritesBooks);
            await updateInDatabase(user.uid, { favoriteBooks: newFavoritesBooks });
        } else {
            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
            renderBooks();;
        }
    } catch (error) {
        console.log(error);
    }
}

// Deleta um livro
const deleteBook = async (index) => {
    const user = await getUser();
    if (user) {
        const userDB = await getUserDataInDB(user.uid);
        const newFavoritesBooks = userDB.favoriteBooks.filter((_, i) => i !== index);

        renderBooks(newFavoritesBooks);
        await updateInDatabase(user.uid, { favoriteBooks: newFavoritesBooks });
    } else {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
}

// Adiciona os eventos de click nos botões de editar, deletar, somar e subtrair
function addBooksActions() {
    const editTitleBtns = document.querySelectorAll(".editBtn");
    const editPageNumBtns = document.querySelectorAll(".page");
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    const sumBtns = document.querySelectorAll(".sumBtn");
    const minusBtns = document.querySelectorAll(".minusBtn");


    editTitleBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => toggleEditTitle(index));
    });

    editPageNumBtns.forEach((pageNum, index) => {
        pageNum.addEventListener("dblclick", () => toggleEditPageNum(pageNum));
    })

    deleteBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => deleteBook(index));
    });

    sumBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => sum(index));
    });

    minusBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => minus(index));
    });
}

// Liga e desliga a capacidade de editar o titulo e o link do livro
const toggleEditTitle = async (index) => {
    let bookTitle = document.querySelectorAll(".title a")[index];
    let bookTitleInput = document.querySelectorAll(".title input")[index];
    let bookLinkInput = document.querySelectorAll(".book-title > input")[index];

    if (bookTitle.classList.contains("disable")) {
        bookTitle.classList.toggle("disable");
        bookTitleInput.classList.toggle("disable");
        bookLinkInput.classList.toggle("disable");
        save(index);
    } else {
        bookTitle.classList.toggle("disable");
        bookTitleInput.classList.toggle("disable");
        bookLinkInput.classList.toggle("disable");
    }

    bookTitleInput.addEventListener("keydown", (e) =>
        closeTitleEditWithKeydown(e, "Enter", index)
    );
    bookTitleInput.addEventListener("keydown", (e) =>
        closeTitleEditWithKeydown(e, "Close", index)
    );
}

// Fecha a edição do titulo e do link do livro com a tecla Enter    
const closeTitleEditWithKeydown = async (e, key, index) => {
    let element = e.target;
    let isEditable = !element.classList.contains("disable");
    if (e.key === key) {
        if (isEditable) {
            toggleEditTitle(index);
        }
    }
}

// Liga e desliga a capacidade de editar o numero de paginas dando douple click e depois salva
function toggleEditPageNum(pageNum) {
    let pageElements = document.querySelectorAll(".page");
    let index = Array.prototype.indexOf.call(pageElements, pageNum);

    let isEditable = pageNum.getAttribute("contenteditable");
    if (isEditable === "true") {
        pageNum.setAttribute("contenteditable", "false");
        pageNum.classList.toggle("editable");
    } else {
        pageNum.setAttribute("contenteditable", "true");
        pageNum.classList.toggle("editable");
    }

    pageNum.addEventListener("keydown", (e) => {
        closePageEditWithKeydown(e, "Enter");
    });
    pageNum.addEventListener("keydown", (e) => {
        closePageEditWithKeydown(e, "Close");
    });
    save(index);
}

// Fecha a edição do numero de paginas quando a tecla Enter é pressionada
function closePageEditWithKeydown(e, key) {
    let isPageEditable = e.target.getAttribute("contenteditable");
    let page = e.target;
    if (e.key === key) {
        if (isPageEditable === "true") {
            page.setAttribute("contenteditable", "false");
            page.classList.toggle("editable");
            let pageElements = document.querySelectorAll(".page");
            let index = Array.prototype.indexOf.call(pageElements, e.target);
            save(index);
        }
    }
}

// Soma 1 no número de páginas
function sum(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) + 1);
    save(index);
}

// Subtrai 1 no número de páginas
function minus(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) - 1);
    save(index);
}

// Renderiza todos os livros da variavel books e monta o card
function renderBooks(books = JSON.parse(localStorage.getItem("books"))) {
    let bookList = document.querySelector("main");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        bookList.innerHTML += Book(book.link, book.title, book.page);
    });
    addBooksActions()
}

export { Book, addBooksActions, renderBooks, addBook }