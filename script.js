let books = JSON.parse(localStorage.getItem("books")) || [];

// Renderiza todos os livros da variavel books e monta o card
function renderBooks() {
    let bookList = document.querySelector("main");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        // TODO: Criar um container para botar o editIcon e o input do link
        bookList.innerHTML += `
            <section class="book-card">
                    <div class="book-title"> 
                    
                    <h2 class="title">
                        <a href="${book.link}">${book.title}</a>
                    </h2>
                    
                    <input type="text" placeholder="Novo Link" class="disable link-editor"/>
                    </div>
                    <img
                        src="./img/edit-icon.png"
                        alt="Editar"
                        class="editBtn"
                        onclick="toggleEdit(${index})"
                    />
                    <img
                        src="./img/delete-icon.png"
                        alt="Excluir"
                        class="deleteBtn"
                        onclick="deleteBook(${index})"
                    />
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

// Liga e desliga a capacidade de editar o titulo e o link do livro
function toggleEdit(index) {
    let bookTitle = document.querySelectorAll(".title a")[index];
    let bookInput = document.querySelectorAll(".book-title input")[index];

    let isEditable = bookTitle.getAttribute("contenteditable");

    if (isEditable === "true") {
        bookTitle.setAttribute("contenteditable", "false");
        bookTitle.classList.toggle("editable");
    } else {
        bookTitle.setAttribute("contenteditable", "true");
        bookTitle.classList.toggle("editable");
    }

    bookInput.classList.toggle("disable");
    save(index);
}

// Liga e desliga a capacidade de editar o numero de paginas dando douple click e depois salva
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
                save(index);
            }
        }
    });
    save(index);
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

// Cria um livro
function addBook() {
    let title = `Titulo do livro`;
    let link = ``;
    let page = 1;

    let newBook = { title, link, page };
    books.push(newBook);

    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
}

// Salva tudo
function save(index) {
    let title = document.querySelectorAll(".title a")[index].textContent;
    let link =
        document.querySelectorAll(".link-editor")[index].value ||
        document.querySelectorAll(".title a")[index].href;
    let page = document.querySelectorAll(".page")[index].textContent;

    books[index] = { title, link, page };
    localStorage.setItem("books", JSON.stringify(books));
}

// Deleta um livro
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
}

addBookBtn.onclick = addBook;

window.onload = renderBooks;
