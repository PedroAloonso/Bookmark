// book = {title:'Titulo do livro', link:'link do livro', page:123}
let books = [
    { title: "Titulo do livro", link: "link do livro", page: 123 },
    { title: "Title of Book 2", link: "link of Book 2", page: 456 },
    { title: "Title of Book 3", link: "link of Book 3", page: 789 },
    { title: "Title of Book 4", link: "link of Book 4", page: 1011 },
];

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

                        <input type="text" placeholder="Link" class="disable"/>
                    </div>

                    <div class="page-container">
                        <h3>Página:</h3>

                        <img src="./img/arrow-left-icon.png" alt="Subtrai 1" onclick="minus(${index})"/>

                        <p class="page" ondblclick="toggleEditPage(this)" >${book.page}</p>

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
}

function toggleEditPage(page) {
    let isEditable = page.getAttribute("contenteditable");
    if (isEditable === "true") {
        page.setAttribute("contenteditable", "false");
        page.classList.toggle("editable");
    } else {
        page.setAttribute("contenteditable", "true");
        page.classList.toggle("editable");
    }

    page.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            page.setAttribute("contenteditable", "false");
            page.classList.toggle("editable");
        }
    });
}

function sum(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) + 1);
}
function minus(index) {
    let bookPage = document.querySelectorAll(".page")[index];
    let pageNum = bookPage.textContent;
    bookPage.textContent = String(Number(pageNum) - 1);
}



window.onload = renderBooks;
