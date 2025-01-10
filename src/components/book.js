const books = JSON.parse(localStorage.getItem("books")) || [];

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
                src="./img/edit-icon.png"
                alt="Editar"
                class="editBtn"
            />
            <img
                src="./img/delete-icon.png"
                alt="Excluir"
                class="deleteBtn"
            />
    
            <div class="page-container">
                <h3>Página:</h3>
                <img src="./img/arrow-left-icon.png" alt="Seta para esquerda" class="minusBtn"/>
                <p class="page">${page}</p>
                <img src="./img/arrow-right-icon.png" alt="Seta para direita" class="sumBtn" />
            </div>
        </section>
    `
}

// Salva tudo
function save(index) {
    let title = document.querySelectorAll(".title input")[index].value;
    let link =
        document.querySelectorAll(".link-input")[index].value ||
        document.querySelectorAll(".title a")[index].href;
    let page = document.querySelectorAll(".page")[index].textContent;

    books[index] = { title, link, page };
    localStorage.setItem("books", JSON.stringify(books));
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
    addBooksActions();
}


// Deleta um livro
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    addBooksActions();;
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
function toggleEditTitle(index) {
    let bookTitle = document.querySelectorAll(".title a")[index];
    let bookTitleInput = document.querySelectorAll(".title input")[index];
    let bookLinkInput = document.querySelectorAll(".book-title > input")[index];

    if (bookTitle.classList.contains("disable")) {
        bookTitle.classList.toggle("disable");
        bookTitleInput.classList.toggle("disable");
        bookLinkInput.classList.toggle("disable");
        save(index);
        renderBooks();
        addBooksActions();
    } else {
        bookTitle.classList.toggle("disable");
        bookTitleInput.classList.toggle("disable");
        bookLinkInput.classList.toggle("disable");
    }

    bookTitleInput.addEventListener("keydown", (e) =>
        closeThisTitleEditInKeydown(e, "Enter", index)
    );
    bookTitleInput.addEventListener("keydown", (e) =>
        closeThisTitleEditInKeydown(e, "Close", index)
    );
}

// Fecha a edição do titulo e do link do livro
function closeThisTitleEditInKeydown(e, key, index) {
    let element = e.target;
    let isEditable = !element.classList.contains("disable");
    if (e.key === key) {
        if (isEditable) {
            toggleEditTitle(index);
            renderBooks();
            addBooksActions();;
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
        closeThisPageEditInKeydown(e, "Enter");
    });
    pageNum.addEventListener("keydown", (e) => {
        closeThisPageEditInKeydown(e, "Close");
    });
    save(index);
}

// Fecha a edição do numero de paginas
function closeThisPageEditInKeydown(e, key) {
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
    console.log(books)
    let bookList = document.querySelector("main");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        bookList.innerHTML += Book(book.link, book.title, book.page);
    });
}

export { Book, addBooksActions, renderBooks, addBook}