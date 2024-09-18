// book = {title:'Titulo do livro', link:'link do livro', page:123}
let books = JSON.parse(localStorage.getItem("books")) || [];

function renderBooks() {
    let bookList = document.querySelector("main");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        // Criar um container para botar o editIcon e o input do link
        bookList.innerHTML += `
            <section class="book-card">
                    <div class="book-title"> 
                        <img
                            src="./img/edit-icon.png"
                            alt="Editar"
                            class="editBtn"
                            onclick="toggleEdit(${index})"
                        />

                        <h2 class="title">
                            <a href="${book.link}"
                                >${book.title}</a
                            >
                        </h2>

                        <input type="text" placeholder="Novo Link" class="disable link-editor"/>
                    </div>

                    <div class="page-container">
                        <h3>Página:</h3>

                        <img src="./img/arrow-left-icon.png" alt="Subtrai 1" onclick="minus(${index})"/>

                        <p class="page" ondblclick="toggleEditPageNum(this)" >${book.page}</p>

                        <img src="./img/arrow-right-icon.png" alt="Adiciona 1" onclick="sum(${index})" />
                    </div>
                </section>
        `;
    });
}

function toggleEdit(index) {
    let bookTitle = document.querySelectorAll(".title a")[index];
    let bookInput = document.querySelectorAll(".book-title input")[index];

    let isEditable = bookTitle.getAttribute("contenteditable");
    isEditable === "true"
        ? bookTitle.setAttribute("contenteditable", "false")
        : bookTitle.setAttribute("contenteditable", "true");

    bookInput.classList.toggle("disable");
    saveChange(index)
}

function toggleEditPageNum(pageNum) {
    let isEditable = pageNum.getAttribute("contenteditable");
    if (isEditable === "true") {
        pageNum.setAttribute("contenteditable", "false");
        pageNum.classList.toggle("editable");
    } else {
        pageNum.setAttribute("contenteditable", "true");
        pageNum.classList.toggle("editable");
    }

    pageNum.addEventListener("keydown", (e) => {
        isEditable = e.target.getAttribute("contenteditable");
        if (e.key === "Enter") {
            if (isEditable === "true") {
                pageNum.setAttribute("contenteditable", "false");
                pageNum.classList.toggle("editable");
                let pageElements = document.querySelectorAll(".page");
                let index = Array.prototype.indexOf.call(
                    pageElements,
                    e.target
                );
                saveChange(index)
            }
        }
    });
}

function sum(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) + 1);
    saveChange(index);
}

function minus(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) - 1);
    saveChange(index);
}

function addBook() {
    let title = `Titulo do livro`;
    let link = ``;
    let page = 1;

    let newBook = { title, link, page };
    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
}

function saveChange(index) {
    let title = document.querySelectorAll(".title a")[index].textContent;
    let link =
        document.querySelectorAll(".link-editor")[index].value ||
        document.querySelectorAll(".title a")[index].href;
    let page = document.querySelectorAll(".page")[index].textContent;

    books[index] = { title, link, page };
    localStorage.setItem("books", JSON.stringify(books));
}

addBookBtn.onclick = addBook;

window.onload = renderBooks;
